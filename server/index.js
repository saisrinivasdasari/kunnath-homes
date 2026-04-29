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
          name: 'Orange Villa',
          price: 10000,
          beds: 2,
          capacity: 15,
          images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop'],
          amenities: ['Fast Wifi', 'Private Pool', 'Kitchen', 'Free Parking'],
          description: 'Welcome to Orange Villa. Disconnect from the city and enjoy the peaceful serenity.',
        },
        {
          name: 'Mint House',
          price: 20000,
          beds: 4,
          capacity: 22,
          images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop'],
          amenities: ['Fast Wifi', 'Private Pool', 'Air Conditioning', 'Free Parking'],
          description: 'Mint House. Our most premium offering. Huge lawns and massive capacity.',
        },
        {
          name: 'Lemon A',
          price: 16000,
          beds: 3,
          capacity: 16,
          images: ['https://images.unsplash.com/photo-1505843513577-22bb7abd5017?q=80&w=800&auto=format&fit=crop'],
          amenities: ['Fast Wifi', 'Kitchen', 'Free Parking'],
          description: 'A beautiful Lemon themed farm stay. Cozy, aesthetic, and completely peaceful.',
        },
        {
          name: 'Lemon B',
          price: 20000,
          beds: 5,
          capacity: 25,
          images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop'],
          amenities: ['Fast Wifi', 'Private Pool', 'Kitchen', 'Air Conditioning'],
          description: 'The largest Lemon farm stay. Designed for big celebrations and unforgettable nights.',
        }
      ];
      await FarmStay.insertMany(dummyStays);
      console.log('Dummy stays injected successfully!');
    }

    const sportCount = await Sport.countDocuments();
    if (sportCount === 0) {
      console.log('No sports found. Injecting dummy data...');
      const dummySports = [
        {
          name: 'Box Cricket',
          price: 1000,
          duration: '1 hr',
          image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
          description: 'Fully enclosed, turf-surfaced arena perfect for day or night matches with friends and family.',
          icon: '🏏'
        },
        {
          name: 'Volleyball',
          price: 400,
          duration: '1 hr',
          image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop',
          description: 'Professional grade sand court for the ultimate beach volleyball experience right at the farm.',
          icon: '🏐'
        },
        {
          name: 'ATV Ride',
          price: 300,
          duration: '1 lap',
          image: 'https://images.unsplash.com/photo-1596328221805-47ebec271d54?q=80&w=800&auto=format&fit=crop',
          description: 'Experience the thrill of off-roading on our custom-built dirt track spanning the estate.',
          icon: '🏎️'
        },
        {
          name: 'Cricket Net',
          price: 100,
          duration: '30 mins',
          image: 'https://images.unsplash.com/photo-1590226346985-7815fa2fa766?q=80&w=800&auto=format&fit=crop',
          description: 'Practice your swing with our automated bowling machine and professional nets.',
          icon: '🏏'
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
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);



console.log('stayRoutes object:', stayRoutes);
console.log('stayRoutes.stack:', stayRoutes?.stack);
app.use('/api/stays', (req, res, next) => { console.log('Hit /api/stays middleware'); next(); }, stayRoutes);
app.get('/api/stays-direct', (req, res) => res.json([{ test: 'works' }]));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
