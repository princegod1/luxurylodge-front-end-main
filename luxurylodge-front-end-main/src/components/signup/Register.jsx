//Register page 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import countryList from 'country-list';
import { PhoneInput } from "react-international-phone";
import Nav from '../home/Nav';
import Footer from '../home/footer';
import { connect } from 'react-redux';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  firebaseApp,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from './firebase';

const RegisterPage = ({ darkMode }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [imageStyle, setImageStyle] = useState({});
  const [nationalities, setNationalities] = useState([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState('');
 



  useEffect(() => {
    // Get the list of countries from the "country-list" package
    setNationalities(countryList.getNames());
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageStyleChange = (e) => {
    const { name, value } = e.target;
    setImageStyle((prevStyle) => ({ ...prevStyle, [name]: value }));
  };

  const saveUserDataAndRedirect = async (userData, uid) => {
    const { password, ...userDataWithoutPassword } = userData;
  
    const db = getFirestore(firebaseApp);
    const userCollection = collection(db, 'Users');
  
    // Add user data to Firestore using the provided UID
    await setDoc(doc(userCollection, uid), {
      ...userDataWithoutPassword,
      uid: uid, // Store UID in Firestore as well
    });
  
    // Upload profile picture to Firebase Storage
    if (profilePic) {
      const blob = await fetch(profilePic).then((res) => res.blob());
      const storageRef = ref(getStorage(firebaseApp), `profile_pics/${uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      userDataWithoutPassword.profilePic = downloadURL;
  
      // Update the user document in Firestore with the profile picture URL
      await setDoc(doc(userCollection, uid), { profilePic: downloadURL }, { merge: true });
    }
  
    // Redirect to login page after successful registration
    window.location.href = '/';
  };
  
  const handleRegistration = async () => {
    const FullName = document.getElementById('fullName').value;
    const Email = document.getElementById('email').value;
    const Username = document.getElementById('surname').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const   Country = document.getElementById('nationality').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const PhoneNo = document.getElementById('phone').value;
  
    // Check for empty fields
    if (!FullName || !Email || !Username || !gender || !Country|| !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
  
    if (password.length < 8) {
      setError('Password is less than 8 characters');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      setIsProcessing(true);
  
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          Email,
          password
        );
  
        // Update user profile with username
        await updateProfile(userCredential.user, {
          displayName: Username,
        });
  
        const userData = {
          FullName,
          Email,
          Username,
          gender,
          Country,
          password,
          PhoneNo
        };
  
        // Save user data to Firestore using the UID from userCredential
        await saveUserDataAndRedirect(userData, userCredential.user.uid);
        setIsProcessing(false);
      } catch (error) {
        // Handle registration errors here
        console.error('Registration error:', error.message);
        setIsProcessing(false);
  
        // Check if the error is due to an existing email
        if (error.code === 'auth/email-already-in-use') {
          setError('This email is already in use. Please use a different email.');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div>
      <Nav />
      <br />
      <br />
      <div className={`section ${darkMode ? 'dark' : ''}`}>
        <div className={`s ${darkMode ? 'dark' : ''}`}>
          <h2>New User?</h2>
          <p style={{ fontSize: '20px' }}>Use this form to create your account</p>
          <label
            htmlFor="imageInput"
            className="profile-pic"
            style={{
              backgroundImage: `url(${profilePic})`,
              position: 'relative',
              ...imageStyle,
              backgroundSize: 'cover',
            }}
          >
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              required
            />
            {!profilePic && (
              <>
                <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: '70px', color: 'white', alignItems: 'center' }} />
                </div>
                <div style={{ position: 'absolute', top: '70px', left: '50%', transform: 'translateX(-50%)' }}>
                  <FontAwesomeIcon icon={faPlus} style={{ fontSize: '20px', color: 'white' }} />
                </div>
              </>
            )}
          </label>

          <div className="form-group">
            <label htmlFor="fullName" className="label">
              FullName:
            </label>
            <input type="text" id="fullName" className="input-field" required />
          </div>

          <div className="form-group">
            <label htmlFor="surname" className="label">
              Username:
            </label>
            <input type="text" id="surname" className="input-field" required />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label">
              E-mail:
            </label>
            <input type="email" id="email" className="input-field" required />
          </div>

          <div className="form-group">
            <label className="label">Gender:</label>
            <div className="gender-group">
              <input type="radio" id="male" name="gender" value="Male" className="custom-radio" required />
              <label htmlFor="male" className="custom-radio-label">
                Male
              </label>

              <input type="radio" id="female" name="gender" value="Female" className="custom-radio" required />
              <label htmlFor="female" className="custom-radio-label">
                Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nationality" className="label">
              Nationality:
            </label>
            <select id="nationality" className="label sel" required>
              {nationalities.map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Phone Number:
            </label>
            <input  type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  className="input-field" required />
          </div>






          <div className="form-group">
            <label htmlFor="password" className="label">
              Password (8 or more characters):
            </label>
            <input type="password" id="password" className="input-field" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password:
            </label>
            <input type="password" id="confirmPassword" className="input-field" />
          </div>

          <button className="submit-btn" onClick={handleRegistration} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Processing...
              </>
            ) : (
              <>
                Create
              </>
            )}
          </button>
          <p style={{ color: 'red' }}>{error}</p>
          <p className="sign-in-link">
            Have an account? <a href="/sn">Sign in</a>
          </p>
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

export default connect(mapStateToProps)(RegisterPage);