const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CRITICAL: Middleware MUST be before routes
app.use(cors());
app.use(express.json()); // THIS LINE MUST BE HERE
app.use(express.urlencoded({ extended: true })); // ADD THIS LINE TOO

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'DealFlow CRM API is running 🚀' });
});

// API Routes (AFTER middleware)
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
