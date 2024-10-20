import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; 

const Home = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign up
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email === 'sakthipriyaganesan116@gmail.com' && password === 'Sakthi@05') {
      setError(''); // Clear error if login is successful
      alert('Login successful!');
      navigate('/travel-journal'); // Redirect to Travel Journal page
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (username === 'SAKTHI PRIYA' && email === 'sakthipriyaganesan116@gmail.com' && password === 'Sakthi@05') {
      setError(''); // Clear error if signup is successful
      alert('Sign up successful!');
      navigate('/travel-journal'); // Redirect to Travel Journal page
    } else {
      setError('Invalid sign-up details.');
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Explorar's Journal</h1>
      </header>

      <div className="form-container">
        {isLogin ? (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account?{' '}
              <span onClick={toggleForm} className="toggle-link">Sign Up</span>
            </p>
          </div>
        ) : (
          <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{' '}
              <span onClick={toggleForm} className="toggle-link">Login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
