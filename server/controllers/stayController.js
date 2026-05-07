const fs = require('fs');
const path = require('path');
const FarmStay = require('../models/FarmStay');
const Booking = require('../models/Booking');

const IMAGE_RE = /\.(jpg|jpeg|png|gif|webp)$/i;

/**
 * Recursively collect all image paths from a directory and its subdirectories.
 * Returns paths like `/stays/{slug}/{file}` or `/stays/{slug}/{subdir}/{file}`.
 */
function collectImages(baseDir, slug) {
  const images = [];
  if (!fs.existsSync(baseDir)) return images;

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  // Root-level images first
  for (const entry of entries) {
    if (entry.isFile() && IMAGE_RE.test(entry.name)) {
      images.push(`/stays/${slug}/${entry.name}`);
    }
  }

  // Then images from subdirectories (category folders)
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDir = path.join(baseDir, entry.name);
      const subFiles = fs.readdirSync(subDir)
        .filter(f => IMAGE_RE.test(f))
        .sort();
      for (const file of subFiles) {
        images.push(`/stays/${slug}/${entry.name}/${file}`);
      }
    }
  }

  return images;
}

/**
 * Deduplicate images: if a file exists both at root and in a subfolder,
 * prefer the root-level path (since existing pages already reference it).
 */
function deduplicateImages(images) {
  const seen = new Set();
  const result = [];
  for (const img of images) {
    // Extract just the filename for dedup comparison
    const filename = path.basename(img);
    if (!seen.has(filename)) {
      seen.add(filename);
      result.push(img);
    }
  }
  return result;
}

// @desc    Fetch all farm stays
// @route   GET /api/stays
// @access  Public
const getStays = async (req, res) => {
  try {
    const stays = await FarmStay.find({ isDeleted: { $ne: true } });
    
    // In serverless environments (Vercel), runtime filesystem access is restricted.
    // We try to inject images from the folder, but fallback gracefully to the database.
    const staysWithImages = stays.map(stay => {
      const stayObj = stay.toObject();
      if (stayObj.slug && process.env.NODE_ENV !== 'production') {
        try {
          const galleryPath = path.join(__dirname, '../../client/public/stays', stayObj.slug);
          const folderImages = deduplicateImages(collectImages(galleryPath, stayObj.slug));
            
          if (folderImages.length > 0) {
            // Merge folder images with existing images, prioritizing folder images
            stayObj.images = Array.from(new Set([...folderImages, ...stayObj.images]));
          }
        } catch (fsError) {
          console.warn(`Filesystem scan skipped for ${stayObj.slug}: ${fsError.message}`);
        }
      }
      return stayObj;
    });

    res.json(staysWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Fetch single farm stay
// @route   GET /api/stays/:id
// @access  Public
const getStayById = async (req, res) => {
  try {
    const stay = await FarmStay.findById(req.params.id);
    
    if (stay) {
      const stayObj = stay.toObject();
      
      // Calculate unavailable dates from confirmed bookings
      const bookings = await Booking.find({
        stayId: stay._id,
        status: { $ne: 'cancelled' }
      });

      const bookedDates = [];
      bookings.forEach(booking => {
        const start = new Date(booking.checkIn);
        const end = new Date(booking.checkOut);
        let current = new Date(start);
        
        while (current < end) {
          bookedDates.push(current.toLocaleDateString('en-CA'));
          current.setDate(current.getDate() + 1);
        }
      });

      stayObj.unavailableDates = Array.from(new Set([
        ...(stayObj.unavailableDates || []),
        ...bookedDates
      ])).sort();

      if (stayObj.slug && process.env.NODE_ENV !== 'production') {
        try {
          const galleryPath = path.join(__dirname, '../../client/public/stays', stayObj.slug);
          const folderImages = deduplicateImages(collectImages(galleryPath, stayObj.slug));

          if (folderImages.length > 0) {
            stayObj.images = Array.from(new Set([...folderImages, ...stayObj.images]));
          }
        } catch (fsError) {
          console.warn(`Filesystem scan skipped for ${stayObj.slug}: ${fsError.message}`);
        }
      }
      res.json(stayObj);
    } else {
      res.status(404).json({ message: 'Farm stay not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Farm stay not found' });
  }
};

module.exports = {
  getStays,
  getStayById,
};
