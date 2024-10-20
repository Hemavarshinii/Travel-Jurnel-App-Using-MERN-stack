import React, { useState, useEffect } from 'react'; 
import './EditJournal.css';

const EditJournal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  // Fetch journal entries from localStorage when the component mounts
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setJournalEntries(storedEntries);
  }, []);

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setUpdatedTitle(entry.title);
    setUpdatedDescription(entry.description);
    setUpdatedLocation(entry.location);
    setUpdatedPhoto(entry.photo || '');
    setPhotoPreview(entry.photo || '');
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      const updatedEntries = journalEntries.filter(entry => entry.id !== id);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setJournalEntries(updatedEntries);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedEntries = journalEntries.map(entry =>
      entry.id === editingEntry.id
        ? { ...entry, title: updatedTitle, description: updatedDescription, location: updatedLocation, photo: updatedPhoto }
        : entry
    );

    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setJournalEntries(updatedEntries);
    setEditingEntry(null);
    setUpdatedPhoto('');
    setPhotoPreview('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setUpdatedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="travel-list-container">
      <header className="journal-header-travel">
        <h1>Modify Journal</h1>
      </header>
      {editingEntry ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <h2>Edit Entry</h2>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <input
            type="text"
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            placeholder="Location"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              style={{ width: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }}
            />
          )}
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingEntry(null)}>Cancel</button>
        </form>
      ) : (
        <>
          {journalEntries.length > 0 ? (
            <ul className="journal-list">
              {journalEntries.map((entry) => (
                <li key={entry.id} className="journal-entry-travel">
                  <h2>{entry.title}</h2>
                  <p><strong>📅Date:</strong> {entry.date} </p> {/* Added emoji */}
                  <p><strong>📍Location:</strong> {entry.location} </p> {/* Added emoji */}
                  <p><strong>✍️Description:</strong>{entry.description} </p> {/* Added emoji */}
                  {entry.photo && (
                    <img
                      src={entry.photo}
                      alt="Journal Visual"
                      style={{ width: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }}
                    />
                  )}
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(entry)} className="update-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(entry.id)} className="delete-button" style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No journal entries found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EditJournal;
