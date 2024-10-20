import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Your home page component
import TravelJournal from './TravelJournal';
import ReadJournal from './ReadJournal';
import WriteJournal from './WriteJournal';
import EditJournal from './EditJournal';
import BookingForm from './BookingForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/travel-journal" element={<TravelJournal />} />
          <Route path="read-journal" element={<ReadJournal />} />
          <Route path="/write-journal" element={<WriteJournal />} />
          <Route path="/edit-journal" element={<EditJournal />} />
          <Route path="/booking-form" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
