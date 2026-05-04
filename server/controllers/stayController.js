const fs = require('fs');
const path = require('path');
const FarmStay = require('../models/FarmStay');

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
          if (fs.existsSync(galleryPath)) {
            const files = fs.readdirSync(galleryPath);
            const images = files
              .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
              .sort();
              
            if (images.length > 0) {
              const folderImages = images.map(file => `/stays/${stayObj.slug}/${file}`);
              // Merge folder images with existing images, prioritizing folder images
              stayObj.images = Array.from(new Set([...folderImages, ...stayObj.images]));
            }
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
      if (stayObj.slug && process.env.NODE_ENV !== 'production') {
        try {
          const galleryPath = path.join(__dirname, '../../client/public/stays', stayObj.slug);
          if (fs.existsSync(galleryPath)) {
            const files = fs.readdirSync(galleryPath);
            const images = files
              .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
              .sort();
              
            if (images.length > 0) {
              const folderImages = images.map(file => `/stays/${stayObj.slug}/${file}`);
              stayObj.images = Array.from(new Set([...folderImages, ...stayObj.images]));
            }
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
