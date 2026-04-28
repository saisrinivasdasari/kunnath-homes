const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const FarmStay = require('./models/FarmStay');

dotenv.config();

const dummyStays = [
  {
    name: 'Orange Farm Stay',
    price: 10000,
    beds: 2,
    capacity: 15,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop',
    ],
    amenities: ['Fast Wifi', 'Private Pool', 'Kitchen', 'Free Parking'],
    description: 'Welcome to your luxurious retreat. Disconnect from the city and enjoy the peaceful serenity of the Kunnath House Orange Farm Stay.',
  },
  {
    name: 'Mint Farm Stay',
    price: 20000,
    beds: 4,
    capacity: 22,
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
    ],
    amenities: ['Fast Wifi', 'Private Pool', 'Air Conditioning', 'Free Parking'],
    description: 'Our most premium offering. Huge lawns and massive capacity for your entire family or corporate team.',
  },
  {
    name: 'Lemon A',
    price: 16000,
    beds: 3,
    capacity: 16,
    images: [
      'https://images.unsplash.com/photo-1505843513577-22bb7abd5017?q=80&w=800&auto=format&fit=crop',
    ],
    amenities: ['Fast Wifi', 'Kitchen', 'Free Parking'],
    description: 'A beautiful Lemon themed farm stay. Cozy, aesthetic, and completely peaceful.',
  },
  {
    name: 'Lemon B',
    price: 20000,
    beds: 5,
    capacity: 25,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
    ],
    amenities: ['Fast Wifi', 'Private Pool', 'Kitchen', 'Air Conditioning'],
    description: 'The largest Lemon farm stay. Designed for big celebrations and unforgettable nights.',
  }
];

const importData = async () => {
  try {
    await connectDB();
    await FarmStay.deleteMany(); // Clear existing
    await FarmStay.insertMany(dummyStays);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
