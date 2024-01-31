// ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from './firebase';
import { connect } from 'react-redux';

const ForgotPasswordPage = ({darkMode}) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send a password reset email to the user's email address
      await sendPasswordResetEmail(auth, email);

      setSuccessMessage('Password reset email sent. Check your inbox.');
      setErrorMessage('');
    } catch (error) {
      console.error('Password reset error:', error.message);
      setErrorMessage('Error sending password reset email. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className={`forgot-password-container ${darkMode ? "dark" : ""}`}>
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="forgot-password-form-group">
          <label htmlFor="email" className="forgot-password-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="forgot-password-input-field"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <button type="submit" className="forgot-password-submit-btn" disabled={loading}>
          Reset Password
        </button>

        {loading && <p>Loading...</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Link back to the sign-in page */}
        <Link to="/sn" className="forgot-password-back-link">
          Back to Sign In
        </Link>
      </form>
    </div>
    
  );
};



const mapStateToProps = (state) => {
  return {
      cardData: state.cardData,
      darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps)( ForgotPasswordPage);