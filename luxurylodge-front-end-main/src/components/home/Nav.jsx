import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../signup/firebase'; // Import your Firebase auth instance
import { getUserDataAndProfilePic } from '../signup/firebaseUtils';

function Nav({ darkMode, toggleDarkMode, toggleMenu, isMenuOpen, closeMenu }) {
  const handleLinkClick = () => {
    if (isMenuOpen) {
      closeMenu();
    }
  };


  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        try {
          // Retrieve user data and profile picture from Firestore using the UID
          const { userData: userDataFromFirestore, profilePic: profilePicFromFirestore } = await getUserDataAndProfilePic(user.uid);

          // Update the component state with the retrieved user data and profile picture
          setUser(userDataFromFirestore);
          setProfilePic(profilePicFromFirestore);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        // User is signed out
        // You may want to redirect to the sign-in page or handle this case
        setUser(null);
        setProfilePic(null);
      }
    });

    return () => unsubscribe();
  }, []); // Make sure to include an empty dependency array to run the effect only once


 
  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
      {/* ToggleSwitch */}
      <div className="user-toggle-container">
      {user ? (
           // If the user is authenticated, show the profile picture as the icon
           <a href='/profile'>  <img src={profilePic} alt="Profile" className={`font user-ico ${darkMode ? 'dark' : ''}`} /></a>
         ) : (
           // If the user is not authenticated, show the default user icon
           <a href='/sn'> <FontAwesomeIcon icon={faUser} className={`font user-icon ${darkMode ? 'dark' : ''}`} /></a>
       )}
       
        <div className="toggle-container">
          <input
            type="checkbox"
            id="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            style={{ display: 'none' }}
          />
          <label htmlFor="checkbox" className="switch">
            <span className={`slider ${darkMode ? 'checked' : ''}`} />
          </label>
        </div>
      </div>
      {/* End ToggleSwitch */}
      <div className={`img-logo ${darkMode ? 'dark' : ''}`} />
      <div className={`menu-icon ${darkMode ? 'dark' : ''}`} onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`menu ${isMenuOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
        <li>
          {/* <Link to="/" className={`nav-link ${darkMode ? 'dark' : ''}`} onClick={handleLinkClick}>
            Home
          </Link> */}
          <a href="/" className={`nav-link ${darkMode ? 'dark' : ''}`}  >Home</a> 
        </li>
        <li>
        <a href="/hotels"  className={`nav-link ${darkMode ? 'dark' : ''}`} onClick={handleLinkClick}>
            View Hotels
            </a> 
        </li>
        <li>
        <a href="/reserve" className={`nav-link ${darkMode ? 'dark' : ''}`} onClick={handleLinkClick}>
            Reservations
            </a> 
        </li>
        <li>
        <a href="/aboutus"  className={`nav-link ${darkMode ? 'dark' : ''}`} onClick={handleLinkClick}>
            About us
            </a> 
        </li>
        
       
      </ul>
      
    </nav>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
  isMenuOpen: state.isMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' }),
  toggleMenu: () => dispatch({ type: 'TOGGLE_MENU' }),
  closeMenu: () => dispatch({ type: 'CLOSE_MENU' }), // Add this action to close the menu
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);