import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SuccessPage = ({ darkMode }) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // 100% of the viewport height
    width: '100%', // 100% of the viewport width
  };

  const commonStyles = {
    textAlign: 'center',
    padding: '50px',
  };

  const lightModeStyles = {
    backgroundColor: 'white',
    color: 'black',
  };

  const darkModeStyles = {
    backgroundColor: '#2c2c2c', // Change this to your dark mode background color
    color: 'white',
  };

  const buttonStyles = {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div className={`b ${darkMode ? 'dark' : ''}`} style={{ ...containerStyles, ...(darkMode ? darkModeStyles : lightModeStyles) }}>
      <div style={{ ...commonStyles }}>
        <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '100px', color: 'green' }} />
        <h1>Reservation Successful!</h1>
        <p>Your reservation has been confirmed.</p>
        <p>Thank you for choosing our hotel.</p>
        <Link to="/">
          <button
            style={{
              ...buttonStyles,
              backgroundColor: darkMode ? '#4CAF50' : '#008CBA', // Adjust colors based on dark/light mode
              color: 'white',
              border: 'none',
            }}
          >
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(SuccessPage);
