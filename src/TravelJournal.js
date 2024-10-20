import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelJournal.css'; // For TravelJournal component styles
import './TravelCarousel.css'; // For TravelCarousel component styles

// TravelJournal Component
const TravelJournal = () => {
  const navigate = useNavigate();

  const handleReadJournal = () => {
    navigate('/read-journal');
  };

  const handleWriteJournal = () => {
    navigate('/write-journal');
  };

  const handleEditJournal = () => {
    navigate('/edit-journal');
  };

  return (
    <div className="travel-content">
      <h2>What would you like to do?</h2>
      <div className="travel-options">
        <div className="travel-option">
          <img src="https://cdn.shopify.com/s/files/1/0533/3693/2505/files/PhotoRoom_20231027_170707_480x480.jpg?v=1698422950" alt="Journal Library" className="travel-option-image" />
          <button onClick={handleReadJournal} className="travel-button">
            Journal Library
          </button>
        </div>
        <div className="travel-option">
          <img src="https://miro.medium.com/v2/resize:fit:1200/1*roqF8yyhOkBXBhCBH5oWqw.jpeg" alt="Entry Builder" className="travel-option-image" />
          <button onClick={handleWriteJournal} className="travel-button">
            Entry Builder
          </button>
        </div>
        <div className="travel-option">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsE5rpp7HNS5-tOHrLiRAiBzhQ9Z4l0-B1ZQ&s" alt="Refine Journal" className="travel-option-image" />
          <button onClick={handleEditJournal} className="travel-button">
            Refine Journal
          </button>
        </div>
      </div>
    </div>
  );
};

// TravelCarousel Component
const images = [
  {
    src: "https://static.sadhguru.org/d/46272/1626099393-velliangiri-mountains-3.jpg",
    content: "Vellikiri Hill Temple",
    description: "Explore the mountains 🏞️",
  },
  {
    src: "https://media.istockphoto.com/id/476044242/photo/sunrise-on-beach.jpg?s=612x612&w=0&k=20&c=wye8Ryn31nrmMT6DBzQ2BncW9PHvVkU7jjmUhFIdVNU=",
    content: "Merina Beach",
    description: "Relax by the beach 🏖️",
  },
  {
    src: "https://tamilnadutourisminfo.com/wp-content/uploads/2019/03/kolli-hills.jpg",
    content: "Kolli Hills",
    description: "City adventures 🏙️",
  },
  {
    src: "https://t3.ftcdn.net/jpg/00/13/76/72/360_F_13767262_eK4YRkDvFeM0KQ2JlDZjwiQXqyQdF6gk.jpg",
    content: "Mahabalipuram",
    description: "Discover ancient ruins 🏛️",
  },
  {
    src: "https://static.toiimg.com/photo/38488063.cms",
    content: "Vedanthangal Bird Sanctuary",
    description: "Safari experience 🐘",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqquyonnh0nvQfzv5RllFT4lrC1PCJhX3Yg&s",
    content: "Yercaud",
    description: "Winter wonderland ❄️",
  },
  {
    src: "https://www.goldentriangletour.com/userfiles/47cd6a11a4181cf7e04e91e12c67396e_1817.jpg",
    content: "Thanjavur",
    description: "Discover the legacy of the Cholas ⚔️"
  }
];

const TravelCarousel = () => {
  const navigate = useNavigate();

  const handleBookingForm = () => {
    navigate('/booking-form'); // Fixed typo in the route
  };

  return (
    <div className="travel-carousel">
      <h1>Let's Travel</h1>
      <div className="carousel-container">
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image.src} alt={`Travel destination ${index + 1}`} /> {/* Corrected alt attribute */}
            <h3>{image.content}</h3>
            <p>{image.description}</p>
          </div>
        ))}
      </div>
      <button className="book-now" onClick={handleBookingForm}>Submit</button> {/* Corrected onClick handler */}
    </div>
  );
};

// Main TravelPage Component
const TravelPage = () => {
  return (
    <div className="travel-page-container">
      {/* Travel Journal Section */}
      <header className="travel-header">
        <h1>Explorer's Journal</h1>
      </header>
      <TravelJournal />

      {/* Travel Carousel Section */}
      <TravelCarousel />
    </div>
  );
};

export default TravelPage;
