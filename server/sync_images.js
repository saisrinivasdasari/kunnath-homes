const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const FarmStay = require('./models/FarmStay');

dotenv.config({ path: path.join(__dirname, '.env') });

const syncImages = async () => {
  try {
    await connectDB();
    
    const stays = await FarmStay.find({});
    console.log(`Found ${stays.length} stays.`);
    
    for (const stay of stays) {
      if (!stay.slug) continue;
      
      console.log(`Processing ${stay.name} with slug: ${stay.slug}`);
      const galleryPath = path.join(__dirname, '../client/public/stays', stay.slug);
      
      if (fs.existsSync(galleryPath)) {
        const files = fs.readdirSync(galleryPath);
        const images = files
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map(file => `/stays/${stay.slug}/${file}`);
          
        console.log(`Found ${images.length} images for ${stay.name}.`);
        if (images.length > 0) {
          stay.images = images;
          await stay.save();
          console.log(`Updated ${stay.name} with ${images.length} images.`);
        } else {
          console.log(`No images found in folder for ${stay.name}.`);
        }
      } else {
         console.log(`Folder not found for ${stay.name} at ${galleryPath}`);
      }
    }
    
    console.log('Image sync completed!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

syncImages();
