import React, { useState, useEffect } from 'react';
import './ReadJournal.css';

const ReadJournal = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  // Fetch journal entries from localStorage when the component mounts
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setJournalEntries(storedEntries);
  }, []);

  return (
    <div className="journal-list-container">
      <header className="journal-header">
        <h1>Journal Archive</h1>
      </header>
      {journalEntries.length > 0 ? (
        <ul className="journal-list">
          {journalEntries.map((entry) => (
            <li key={entry.id} className="journal-entry">
              <h2>{entry.title}</h2>
              <p>
                <span role="img" aria-label="Calendar" style={{ marginRight: '5px' }}>
                  📅
                </span>
                <strong>Date:</strong> {entry.date}
              </p>
              <p>
                <span role="img" aria-label="Location" style={{ marginRight: '5px' }}>
                  📍
                </span>
                <strong>Location:</strong> {entry.location}
              </p>
              <p>
                <span role="img" aria-label="Description" style={{ marginRight: '5px' }}>
                  📖
                </span>
                <strong>Description:</strong> {entry.description}
              </p>
              {entry.photo && (
                <img
                  src={entry.photo}
                  alt="Journal Visual"
                  style={{ width: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }}
                />
              )}
              {/* Delete button removed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No journal entries found.</p>
      )}
    </div>
  );
};

export default ReadJournal;
