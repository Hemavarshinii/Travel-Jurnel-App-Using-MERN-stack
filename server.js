const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON requests

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/travelBooking'; // Replace with your actual MongoDB URI
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for the bookings
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// POST route to save booking data
app.post('/api/bookings', async (req, res) => {
  const { name, source, destination, startDate, endDate, totalCost } = req.body;

  // Validate input
  if (!name || !source || !destination || !startDate || !endDate || totalCost === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new booking entry
  const newBooking = new Booking({
    name,
    source,
    destination,
    startDate,
    endDate,
    totalCost,
  });

  try {
    // Save the booking to MongoDB
    await newBooking.save();
    console.log('Booking saved successfully');
    res.status(201).json({ message: 'Booking saved successfully!' }); // 201 for created
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
