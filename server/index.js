const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const stayRoutes = require('./routes/stayRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const FarmStay = require('./models/FarmStay');
const Sport = require('./models/Sport');

// Connect to MongoDB
connectDB().then(async () => {
  try {
    const count = await FarmStay.countDocuments();
    if (count === 0) {
      console.log('No stays found. Injecting dummy data into the database...');
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
          images: [
            '/stays/orange/Mainview.JPG',
            '/stays/orange/Pool.jpeg',
            '/stays/orange/Living Room.jpeg',
            '/stays/orange/1- Bedrrom.jpeg',
            '/stays/orange/2-Bedroom.jpeg',
            '/stays/orange/Others.jpeg'
          ],
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
          images: [
            '/stays/lemon/Mainview.JPG',
            '/stays/lemon/Kitchen.JPG',
            '/stays/lemon/Bedrrom 1.jpg',
            '/stays/lemon/Living room.jpg',
            '/stays/lemon/Bedroom4.JPG',
            '/stays/lemon/Bedrrom3.JPG'
          ],
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
          images: [
            '/stays/mint/1-Living room.jpg',
            '/stays/mint/main View.jpg',
            '/stays/mint/Pool.jpg',
            '/stays/mint/Bedroom 2.jpg',
            '/stays/mint/Mint bedroom 3.jpeg',
            '/stays/mint/others3.JPG'
          ],
          amenities: ['Huge Swimming Pool', 'Party Lawn', 'Projector', '65” Smart TV', 'Powerful Music System', 'WIFI', 'Refrigerator', 'Microwave', 'BBQ Setup', '55inch Smart TV', 'Party speaker', 'RO Water', 'Kitchen', 'Extra Mattresses', 'Geyser', 'AC', 'Campfire', 'Restaurant'],
          foodOptions: ['Swiggy & Zomato Available', 'Chef Available on request', 'In-House kitchen available'],
          addOns: [{ name: 'Campfire', price: 750 }, { name: 'Kitchen', price: 1000 }],
          description: 'Mint is a spacious 4-bedroom private stay featuring a living room, dining area, and a large party hall. Enjoy a huge swimming pool, party lawn, projector, 65” Smart TV, powerful music system, high-speed WIFI, refrigerator, microwave, and BBQ setup—perfect for celebrations, group stays, and unforgettable get-togethers.',
        },
      ];
      await FarmStay.insertMany(dummyStays);
      console.log('Dummy stays injected successfully!');
      // One-time fix for existing stays with wrong profile image path or empty gallery
      const allStays = await FarmStay.find({});
      for (const s of allStays) {
        let updated = false;
        if (s.slug === 'orange' && (s.images.length < 5 || s.images.includes('/stays/orange/profile.jpg'))) {
          s.images = [
            '/stays/orange/Mainview.JPG',
            '/stays/orange/Pool.jpeg',
            '/stays/orange/Living Room.jpeg',
            '/stays/orange/1- Bedrrom.jpeg',
            '/stays/orange/2-Bedroom.jpeg',
            '/stays/orange/Others.jpeg'
          ];
          updated = true;
        }
        if (s.slug === 'lemon' && (s.images.length < 5 || s.images.includes('/stays/lemon/profile.jpg'))) {
          s.images = [
            '/stays/lemon/Mainview.JPG',
            '/stays/lemon/Kitchen.JPG',
            '/stays/lemon/Bedrrom 1.jpg',
            '/stays/lemon/Living room.jpg',
            '/stays/lemon/Bedroom4.JPG',
            '/stays/lemon/Bedrrom3.JPG'
          ];
          updated = true;
        }
        if (s.slug === 'mint' && (s.images.length < 5 || s.images.includes('/stays/mint/profile.jpg') || s.images[0] !== '/stays/mint/1-Living room.jpg')) {
          s.images = [
            '/stays/mint/1-Living room.jpg',
            '/stays/mint/main View.jpg',
            '/stays/mint/Pool.jpg',
            '/stays/mint/Bedroom 2.jpg',
            '/stays/mint/Mint bedroom 3.jpeg',
            '/stays/mint/others3.JPG'
          ];
          updated = true;
        }
        if (updated) {
          await s.save();
          console.log(`Updated gallery for ${s.name}`);
        }
      }
    }

    const sportCount = await Sport.countDocuments();
    if (sportCount === 0) {
      console.log('No sports found. Injecting dummy data...');
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
      await Sport.insertMany(dummySports);
      console.log('Dummy sports injected successfully!');
    }
  } catch (err) {
    console.error('Failed to seed dummy data:', err);
  }
});

// Middleware
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'], credentials: true }));

// Updated code (allows your live Vercel frontend)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://kunnath-homes-cbjg.vercel.app', // <-- ADD YOUR VERCEL URL HERE
  'https://kunnathhouse.in',                 // without www
  'https://www.kunnathhouse.in',
  process.env.FRONTEND_URL // <-- Keep this for flexibility
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stays', stayRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
const sportRoutes = require('./routes/sportRoutes');
app.use('/api/sports', sportRoutes);
const sportBookingRoutes = require('./routes/sportBookingRoutes');
app.use('/api/sport-bookings', sportBookingRoutes);
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
