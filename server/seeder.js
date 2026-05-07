const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const FarmStay = require('./models/FarmStay');
const Sport = require('./models/Sport');
const Event = require('./models/Event');

dotenv.config();

const dummyStays = [
  {
    name: 'Orange',
    slug: 'orange',
    price: 10000,
    weekendPrice: 12000,
    beds: 2,
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
    description: 'Orange is a 2BHK peaceful retreat with private swimming pool, designed for comfort, fun, and memorable moments. Ideal for families, friends, and weekend escapes, this beautifully maintained space offers the perfect balance of relaxation and entertainment.',
  },
  {
    name: 'Lemon',
    slug: 'lemon',
    price: 20000,
    weekendPrice: 25000,
    beds: 5,
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
    name: 'Mint',
    slug: 'mint',
    price: 20000,
    weekendPrice: 25000,
    beds: 4,
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
    description: 'Mint is a spacious 4-bedroom private stay featuring a living room, dining area, and a large party hall. Enjoy a huge swimming pool, party lawn, projector, 65” Smart TV, powerful music system, high-speed WIFI, refrigerator, microwave, and BBQ setup—perfect for celebrations, group stays, and unforgettable get-togethers.',
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
    image: 'https://res.cloudinary.com/dwrxo4hvx/image/upload/v1777899658/2_cwqayd.webp',
    description: 'Practice your batting skills with our automated cricket bowling machine.',
    icon: '🏏'
  },
  {
    name: 'ATV Bike',
    price: 299,
    duration: '1 lap',
    image: 'https://res.cloudinary.com/dwrxo4hvx/image/upload/v1777899656/1_pknngl.jpg',
    description: 'Enjoy an adrenaline-filled ride on our off-road ATV track.',
    icon: '🏎️'
  },
  {
    name: 'RC Car',
    price: 299,
    duration: '15 mins',
    image: 'https://res.cloudinary.com/dwrxo4hvx/image/upload/v1777899657/3_xdxidp.jpg',
    description: 'Have fun racing high-speed remote-controlled cars on our custom track.',
    icon: '🚗'
  }
];

const dummyEvents = [
  {
    title: 'Holi Festival of Colors 2024',
    slug: 'holi-festival-2024',
    category: 'Upcoming',
    shortDescription: 'Join us for a vibrant celebration of Holi with organic colors, music, and traditional food.',
    description: 'Experience the magic of Holi at Kunnath House. We provide safe, organic colors, a live DJ playing the latest Bollywood hits, and an unlimited buffet of traditional snacks and drinks like Thandai. Perfect for families and groups looking for a premium, hassle-free celebration.',
    price: 1499,
    date: new Date('2024-03-25'),
    isFlexibleDate: false,
    images: ['https://images.unsplash.com/photo-1590076215667-873d37389b58?q=80&w=1200&auto=format&fit=crop'],
    capacity: 200,
    isActive: true,
    tags: ['Festival', 'Color', 'Music', 'Party']
  },
  {
    title: 'Executive Leadership Retreat',
    slug: 'executive-retreat',
    category: 'Corporate',
    shortDescription: 'Premium offsite location for high-level corporate meetings and team building.',
    description: 'Elevate your team performance in the serene environment of Kunnath House. Our corporate package includes exclusive use of the estate, high-speed WiFi, conference facilities, premium catering, and organized team-building activities like Box Cricket and ATV rides.',
    price: 25000,
    date: new Date('2024-06-15'),
    isFlexibleDate: true,
    images: ['https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop'],
    capacity: 50,
    isActive: true,
    tags: ['Corporate', 'Strategy', 'Offsite', 'Premium']
  },
  {
    title: 'Traditional Lawn Wedding',
    slug: 'traditional-wedding',
    category: 'Traditional',
    shortDescription: 'Exchange vows in a stunning outdoor setting surrounded by nature.',
    description: 'Transform your special day into an unforgettable masterpiece. Kunnath House offers expansive green lawns, traditional decor setups, and a private villa for the family. Our venue is perfect for intimate to mid-sized weddings seeking a rustic yet luxurious charm.',
    price: 75000,
    date: new Date('2024-11-20'),
    isFlexibleDate: true,
    images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop'],
    capacity: 500,
    isActive: true,
    tags: ['Wedding', 'Traditional', 'Marriage', 'Outdoor']
  },
  {
    title: 'Monsoon Music Unplugged',
    slug: 'monsoon-music-2024',
    category: 'Upcoming',
    shortDescription: 'Enjoy live acoustic performances during the beautiful monsoon season.',
    description: 'Spend a rainy evening with us listening to soulful acoustic music. Set under our covered deck with the smell of wet earth and hot snacks, this event is designed for music lovers seeking a peaceful and intimate concert experience.',
    price: 999,
    date: new Date('2024-07-10'),
    isFlexibleDate: false,
    images: ['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop'],
    capacity: 80,
    isActive: true,
    tags: ['Music', 'Monsoon', 'Unplugged', 'Acoustic']
  },
  {
    title: 'New Year Eve Grand Gala',
    slug: 'new-year-2025',
    category: 'Upcoming',
    shortDescription: 'The ultimate countdown party with fireworks, gourmet dinner, and luxury stay options.',
    description: 'Ring in the new year at the most exclusive estate party in town. Our grand gala features a premium bar, a multi-cuisine gourmet dinner, a spectacular fireworks display at midnight, and an optional overnight stay in our luxury farmhouses.',
    price: 4999,
    date: new Date('2024-12-31'),
    isFlexibleDate: false,
    images: ['https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?q=80&w=1200&auto=format&fit=crop'],
    capacity: 150,
    isActive: true,
    tags: ['New Year', 'Party', 'Fireworks', 'Dinner']
  }
];

const importData = async () => {
  try {
    await connectDB();

    await FarmStay.deleteMany();
    await FarmStay.insertMany(dummyStays);

    await Sport.deleteMany();
    await Sport.insertMany(dummySports);

    await Event.deleteMany();
    await Event.insertMany(dummyEvents);

    console.log('All Data (Stays, Sports, Events) Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
