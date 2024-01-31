
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Nav from '../home/Nav';
import Footer from '../home/footer';
import {
  auth,
  signInWithEmailAndPassword,
} from './firebase';

const SignPage = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, username, password);

      // Redirect to the desired page after successful sign-in
      console.log("logged in")
      window.location.href = '/';
    } catch (error) {
      // Handle sign-in errors here
      console.error('Sign-in error:', error.message);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <Nav />
      <br />
      <br />
      <div className={`section ${darkMode ? 'dark' : ''}`}>
        <div className={`s ${darkMode ? 'dark' : ''}`}>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="label">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
            <p style={{ color: 'red' }}>{error}</p>
            
            {/* Link to the "Forgot Password" page */}
            <Link to="/fg" className="forgot-password-link">
              Forgot Password?
            </Link>

            <p className="sign-in-link">
              Don't Have an account? <a href="/rg">Sign up</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps)(SignPage);
