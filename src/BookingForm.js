

import React, { useState, useEffect } from 'react';
import './BookingForm.css'; // Optional: For form styling

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: 'Sakthi Priya', // Default name
    source: 'Madurai', // Default source
    destination: '',
    startDate: '',
    endDate: '',
  });

  const [totalCost, setTotalCost] = useState(0); // State to track total cost
  const [todayDate, setTodayDate] = useState(''); // State to store today's date
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback

  useEffect(() => {
    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month starts at 0
    const day = String(today.getDate()).padStart(2, '0');

    setTodayDate(`${year}-${month}-${day}`); // Set today's date as the minimum value for startDate
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const calculateCost = () => {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const destinationCosts = {
        'Vellikiri Hill Temple': 900,
        'Merina Beach': 1500,
        'Kolli Hills': 700,
        'Mahabalipuram': 1700,
        'Vedathangal Bird Sanctuary': 1300,
        'Yercaud': 900,
        'Thanjavur': 600,
      };

      if (formData.destination) {
        const costPerDay = destinationCosts[formData.destination];
        if (start && end && end >= start) {
          const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
          setTotalCost(days * costPerDay);
        } else {
          setTotalCost(costPerDay); // If no valid dates, use only the base cost for 1 day
        }
      } else {
        setTotalCost(0); // Reset cost if no destination selected
      }
    };

    calculateCost();
  }, [formData.destination, formData.startDate, formData.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for backend submission
    const bookingData = {
      ...formData,
      totalCost,
    };

    try {
      // Send booking data to the backend
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage('Booking saved successfully!');
        setFormData({
          name: 'Sakthi Priya',
          source: 'Madurai',
          destination: '',
          startDate: '',
          endDate: '',
        });
        setTotalCost(0); // Reset the total cost
      } else {
        setSuccessMessage('Failed to save the booking');
      }
    } catch (error) {
      console.error('Error submitting the booking:', error);
      setSuccessMessage('Error submitting the booking');
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Plan Your Next Trip</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly // Make the name read-only
            required
          />
        </div>

        <div className="form-group">
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Destination:</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select your destination</option>
            <option value="Vellikiri Hill Temple">Vellikiri Hill Temple</option>
            <option value="Merina Beach">Merina Beach</option>
            <option value="Kolli Hills">Kolli Hills</option>
            <option value="Mahabalipuram">Mahabalipuram</option>
            <option value="Vedathangal Bird Sanctuary">Vedathangal Bird Sanctuary</option>
            <option value="Yercaud">Yercaud</option>
            <option value="Thanjavur">Thanjavur</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            min={todayDate}
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            min={formData.startDate}
          />
        </div>

        <div className="form-group">
          <label>Cost of this Place:</label>
          <input
            type="text"
            name="totalCost"
            value={totalCost ? `₹${totalCost}` : ''}
            readOnly
          />
        </div>

        <button type="submit" className="submit-button">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
