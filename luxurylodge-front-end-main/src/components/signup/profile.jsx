// profile page 
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { auth, firebase } from './firebase'; 
import { getUserDataAndProfilePic } from './firebaseUtils';
import Nav from '../home/Nav';
import Footer from '../home/footer';
import { toggleDarkMode } from '../home/store'; // Update the path to your Redux actions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { EmailAuthProvider } from 'firebase/auth';

const YourNewProfilePage = ({ darkMode, toggleDarkMode }) => {
  const [userData, setUserData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const { userData: userDataFromFirestore, profilePic: profilePicFromFirestore } = await getUserDataAndProfilePic(user.uid);
          setUserData(userDataFromFirestore);
          setProfilePic(profilePicFromFirestore);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setUserData(null);
        setProfilePic(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleModeToggle = () => {
    toggleDarkMode();
  };

  const handleDeleteAccount = async () => {
    setIsPasswordModalOpen(true);
  };

  const handleDeleteAccountConfirmed = async () => {
    try {
      await auth.currentUser.delete();
      window.location.href = '/';
    } catch (error) {
      console.error('Delete account error:', error.message);
    } finally {
      setIsPasswordModalOpen(false);
    }
  };

  const closeModal = () => {
    setPassword('');
    setIsPasswordModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handlePasswordDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, password);
  
        // Reauthenticate the user with email and password
        await user.reauthenticateWithCredential(credential);
  
        // Delete the user account
        await user.delete();
  
        // Now you can handle any additional cleanup or redirect logic
        window.location.href = '/';
      } else {
        console.error('User or user email not available for reauthentication.');
      }
    } catch (error) {
      console.error('Account deletion error:', error.code, error.message);
      alert(`Account deletion error: ${error.message}. See the console for details.`);
    } finally {
      setIsPasswordModalOpen(false);
    }
  };
  
  
  

  return (
    <div>
      <Nav />
      <br />
      <br />

      <div className={`section ${darkMode ? 'dark' : ''}`}>
        {/* Your content using userData */}
        <hr />
        <br />
        <h1>Personal Details</h1>
        <p>Update your information and find out how it's used.</p>

        {userData && (
          <div className={`profile-container ${darkMode ? 'dark' : ''}`}>
            <div className={`profile-header ${darkMode ? 'dark' : ''}`}>
              {profilePic && (
                <img src={profilePic} alt="Profile" className="profile-image" />
              )}
              <h2>{userData.Firstname}:)</h2>
            </div>

            <div className="profile-body">
              <div className="profile-item">
                <label>First Name:</label>
                <span>{userData.FullName}</span>
              </div>
              <hr />

              <div className="profile-item">
                <label>Username:</label>
                <span>{userData.Username}</span>
              </div>
              <hr />

              <div className="profile-item">
                <label>Email:</label>
                <span>{userData.Email}</span>
              </div>
              <hr />

              <div className="profile-item">
                <label>Gender:</label>
                <span>{userData.gender}</span>
              </div>
              <hr />

              <div className="profile-item">
                <label>Number:</label>
                <span>{userData.PhoneNo}</span>
              </div>
              <hr />

              <div className="profile-item">
                <label>Nationality:</label>
                <span>{userData.Country}</span>
              </div>
              <hr />
              <br />

              <h1>Preferences</h1>
              <p>Change your web app look in both dark and light mode</p>

              <br />

              <div className="mode-item">

                <label>Mode:</label>
                <span>{darkMode ? 'Dark' : 'Light'}</span>
                <span className="toggle-container">
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
                </span>

              </div>
              <hr />

              <br />
              <h1>Security</h1>
              <p>Adjust your security settings and you can delete your account if not needed</p>
              <br />

              <div className="mode-item">

                <label>Password:</label>
                <span>Reset your password regularly Reset to keep your account secure</span>
                <span className="toggle-container">
                  <div className="toggle-container">
                    <button className='edit-btn'>Reset</button>
                  </div>
                </span>

              </div>
              <hr />
              <div className="mode-item">

                <label>LogOut:</label>
                <span>Logout from your account if needed</span>
                <span className="toggle-container">
                  <div className="toggle-container">
                    <button onClick={handleLogout} className="edit-btn">
                      Logout
                    </button>
                  </div>
                </span>

              </div>
              <hr />
              <div className="mode-item">

                <label>Delete account:</label>
                <span>Permanently delete your account  </span>
                <span className="toggle-container">
                  <div className="toggle-container">
                    <button onClick={handleDeleteAccount} className="edit-btn">
                      Delete
                    </button>
                  </div>
                </span>

              </div>

              <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={closeModal}
        contentLabel="Password Confirmation Modal"
        className={`md ${darkMode ? 'dark' : ''}`}
      >
        <h2>Confirm Password</h2>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button className="c" onClick={handlePasswordDeleteAccount}>
          Confirm and Delete Account
        </button>

        <button className="close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </Modal>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});
const mapDispatchToProps = (dispatch) => ({
  toggleDarkMode: () => dispatch(toggleDarkMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(YourNewProfilePage);
