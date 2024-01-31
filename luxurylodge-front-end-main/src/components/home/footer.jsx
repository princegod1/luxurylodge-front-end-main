// Footer.jsx
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMobileButton, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
    const imageUrl = darkMode
        ? "../../images/dark_logo.jpg" 
        : "../../images/logo2.jpg"; 

    const iconColor = darkMode ? '#ffffff' : '#000000';

    const d = new Date();

    return (
        <div className={`section ${darkMode ? "dark" : ""}`}>
            <hr className={`line ${darkMode ? "dark" : ""}`} />

            <div className="ft">
                <div className="footer-img-container">
                    <img
                        src={imageUrl}
                        alt="Luxury Lodge"
                        className="footer-img"
                    />
                </div>
                <div className={`links ${darkMode ? "dark" : ""}`}>
                    <h2>Quick links</h2>
                    <ul>
                        <li><Link to={"/"} className= {`quick-link ${darkMode ? "dark" : ""}`}>Home</Link></li>
                        <li><Link to={"/services"} className={`quick-link ${darkMode ? "dark" : ""}`}>Services</Link></li>
                        <li><Link to={"/contact"} className={`quick-link ${darkMode ? "dark" : ""}`}>Contact</Link></li>
                    </ul>
                </div>
                
                <div className="ft-app">

                    <h2>Download the app</h2>
                    <p>Find, book and explore our upgraded rooms in moments - even when you're on the go.
                        Get the best value prices at your fingertips. Free for iOS and Android.</p>


                    {/* <FontAwesomeIcon icon={faMobileButton} className="phone-image" style={{ fontSize: '100px', color: iconColor }} /> */}
                    <img src="images/phone.jpg" alt="Phone" className="phone-image" style={{ width: '100px' }} />


                </div>

            </div>



            <div className="social-icons" style={{ fontSize: '30px', color: iconColor, marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faInstagram} className="font" />
                <FontAwesomeIcon icon={faX} className="font" />
                <FontAwesomeIcon icon={faFacebook} className="font" />
                <FontAwesomeIcon icon={faYoutube} className="font" />
                <FontAwesomeIcon icon={faWhatsapp} className="font" />
            </div>
            <hr className={`line2 ${darkMode ? "dark" : ""}`} />

            <div className="c_pay">
                <img src="/images/mastercard.svg" alt="MasterCard_image" className="card_payment" />
                <img src="/images/amex.svg" alt="MasterCard_image" className="card_payment" />
                <img src="/images/apple.svg" alt="MasterCard_image" className="card_payment" />
                <img src="/images/paypal.svg" alt="MasterCard_image" className="card_payment" />
                <img src="/images/visa.svg" alt="MasterCard_image" className="card_payment" />
            </div>
            <p>&copy; {d.getFullYear()} Luxury Lodges. All rights reserved.</p>

        </div>
    );
};

const mapStateToProps = (state) => ({
    darkMode: state.darkMode,
});

export default connect(mapStateToProps)(Footer);
