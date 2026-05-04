const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const FarmStay = require('./models/FarmStay');
const Sport = require('./models/Sport');

dotenv.config();

const dummyStays = [
  {
    name: 'Lemon',
    slug: 'lemon',
    price: 16000,
    beds: 10,
    bedrooms: 5,
    bathrooms: 4,
    halls: 4,
    capacity: 20,
    maxGuests: 25,
    extraGuestCharge: 500,
    securityDeposit: 5000,
    bookingAdvance: 5000,
    images: ['/stays/lemon/profile.jpg'],
    amenities: ['Swimming Pool', 'Music System', 'WIFI', 'Refrigerator', 'Microwave', 'BBQ Setup', '55inch Smart TV', 'Party speaker', 'RO Water', 'Extra Mattresses', 'Geyser', 'AC', 'Campfire', 'Restaurant'],
    foodOptions: ['Swiggy & Zomato Available', 'Chef Available on request', 'In-House kitchen available'],
    addOns: [{ name: 'Campfire', price: 750 }, { name: 'Kitchen', price: 1000 }],
    description: 'Lemon is Spacious private stay with 2 villas, 5 bedrooms, and 4 large halls, ideal for groups up to 25 guests. Enjoy a swimming pool, music system, WiFi, refrigerator, microwave, and BBQ setup—perfect for family get-togethers, parties, and group stays.',
  },
  {
    name: 'Orange Farmhouse',
    slug: 'orange',
    price: 10000,
    beds: 4,
    bedrooms: 2,
    bathrooms: 2,
    halls: 1,
    capacity: 15,
    maxGuests: 20,
    extraGuestCharge: 500,
    securityDeposit: 5000,
    bookingAdvance: 5000,
    images: ['/stays/orange/profile.jpg'],
    amenities: ['Private Swimming Pool', 'Lawn', 'Bonfires', 'Outdoor Projector', '55inch Smart TV', 'Party speaker', 'RO Water', 'Refrigerator', 'Barbeque', 'Microwave', 'Kitchen', 'WIFI', 'Extra Mattresses', 'Geyser', 'AC', 'Campfire', 'Restaurant'],
    foodOptions: ['Swiggy & Zomato Available', 'Chef Available on request', 'In-House kitchen available'],
    addOns: [{ name: 'Campfire', price: 750 }, { name: 'Kitchen', price: 1000 }],
    description: 'Orange Farmhouse is a 2BHK peaceful retreat with private swimming pool, designed for comfort, fun, and memorable moments. Ideal for families, friends, and weekend escapes, this beautifully maintained space offers the perfect balance of relaxation and entertainment.',
  },
  {
    name: 'Mint Farmhouse',
    slug: 'mint',
    price: 20000,
    beds: 8,
    bedrooms: 4,
    bathrooms: 4,
    halls: 1,
    capacity: 15,
    maxGuests: 20,
    extraGuestCharge: 500,
    securityDeposit: 5000,
    bookingAdvance: 5000,
    images: ['/stays/mint/profile.jpg'],
    amenities: ['Huge Swimming Pool', 'Party Lawn', 'Projector', '65” Smart TV', 'Powerful Music System', 'WIFI', 'Refrigerator', 'Microwave', 'BBQ Setup', '55inch Smart TV', 'Party speaker', 'RO Water', 'Kitchen', 'Extra Mattresses', 'Geyser', 'AC', 'Campfire', 'Restaurant'],
    foodOptions: ['Swiggy & Zomato Available', 'Chef Available on request', 'In-House kitchen available'],
    addOns: [{ name: 'Campfire', price: 750 }, { name: 'Kitchen', price: 1000 }],
    description: 'Mint Farmhouse is a spacious 4-bedroom private stay featuring a living room, dining area, and a large party hall. Enjoy a huge swimming pool, party lawn, projector, 65” Smart TV, powerful music system, high-speed WIFI, refrigerator, microwave, and BBQ setup—perfect for celebrations, group stays, and unforgettable get-togethers.',
  },
];

const dummySports = [
  {
    name: 'Box Cricket',
    price: 999,
    duration: '1 hr',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
    description: 'Fully enclosed, turf-surfaced arena perfect for day or night matches with friends and family.',
    icon: '🏏'
  },
  {
    name: 'Volleyball',
    price: 399,
    duration: '1 hr',
    image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop',
    description: 'Professional grade court for an exciting volleyball experience.',
    icon: '🏐'
  },
  {
    name: 'Cricket Bowling Machine',
    price: 299,
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-hC8gvXips0k?q=80&w=800&auto=format&fit=crop',
    description: 'Practice your batting skills with our automated cricket bowling machine.',
    icon: '🏏'
  },
  {
    name: 'ATV Bike',
    price: 299,
    duration: '1 lap',
    image: 'https://images.unsplash.com/photo-1596328221805-47ebec271d54?q=80&w=800&auto=format&fit=crop',
    description: 'Enjoy an adrenaline-filled ride on our off-road ATV track.',
    icon: '🏎️'
  },
  {
    name: 'RC Car',
    price: 299,
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=800&auto=format&fit=crop',
    description: 'Have fun racing high-speed remote-controlled cars on our custom track.',
    icon: '🚗'
  }
];

const importData = async () => {
  try {
    await connectDB();
    await FarmStay.deleteMany();
    await FarmStay.insertMany(dummyStays);
    await Sport.deleteMany();
    await Sport.insertMany(dummySports);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
