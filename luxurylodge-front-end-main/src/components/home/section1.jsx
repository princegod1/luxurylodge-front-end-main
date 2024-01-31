// Section1.jsx
import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function Section1({ darkMode }) {
  return (
    <div className={`hero ${darkMode ? "dark" : ""}`}>
      <video preload="auto" autoPlay loop muted playsInline className="back-video">
        <source src="images/video.mp4" type="video/mp4" />
      </video>

      <div className={`content ${darkMode ? "dark" : ""}`}>
        <h1 className={`h ${darkMode ? "dark" : ""}`}>Luxury Lodges</h1>
        <p>Hotel Reservation System</p>
        <p>Extraordinary five-star out-door activities</p>
        <Link to="/hotels">View Hotels</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(Section1);
