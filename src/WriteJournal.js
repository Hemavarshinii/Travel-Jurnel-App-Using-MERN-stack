import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteJournal.css'; // Corrected the CSS import

const WriteJournal = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState(''); 
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null); 

  // Function to convert uploaded file to Base64
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result); // Save Base64-encoded image
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as DataURL (Base64)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new journal entry with photo and location
    const newJournalEntry = {
      id: Date.now(),
      title,
      date,
      description,
      location,
      photo
    };

    // Get existing entries from localStorage or initialize an empty array if none
    const existingEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    // Add the new entry to the array
    const updatedEntries = [...existingEntries, newJournalEntry];

    // Store the updated entries array in localStorage
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    // Redirect to the ReadJournal page after submission
    navigate('/read-journal');
  };

  return (
    <div className="journal-container">
      <header className="journal-header">
        <h1>Journal Creator</h1>
      </header>
      <form className="journal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
            rows="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload} 
            className="form-input"
          />
        </div>
        <button type="submit" className="journal-button">
          Submit Journal
        </button>
      </form>
    </div>
  );
};

export default WriteJournal;
