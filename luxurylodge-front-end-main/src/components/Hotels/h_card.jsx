import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Card({ title,location, backgroundImage, hotelId, onCheckAvailability,hotelLocation }) {
  const [availabilityClicked, setAvailabilityClicked] = useState(false);

  const handleCheckAvailabilityClick = () => {
    onCheckAvailability(hotelId,title, hotelLocation);
    setAvailabilityClicked(true);
  };

  useEffect(() => {
    // Check if availabilityClicked is true, then wait 5 seconds and simulate a click on the "to" button
    if (availabilityClicked) {
      const timeoutId = setTimeout(() => {
        // You can get the "to" button element using a ref
        const toButton = document.getElementById('toButton');

        // Simulate a click on the "to" button
        toButton && toButton.click();
      }, 1000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [availabilityClicked]);

  return (
    <div className="cardStyle">
      <div className="cd">
        <img
          src={backgroundImage}
          alt={title}
          style={{ height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="textStyle">
        <h1>{title}</h1>
        <p>{location}</p>

        <div>
          <button onClick={handleCheckAvailabilityClick}>Check Availability</button>
          <a href="/ht" to='/ht' id="toButton" style={{ display: 'none' }}>to</a>
        </div>
      </div>
    </div>
  );
}

export default Card;
