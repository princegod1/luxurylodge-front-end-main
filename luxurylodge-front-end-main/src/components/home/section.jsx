import React from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBiking, faMusic, faWifi, faParking, faSwimmer, faWineGlass, faBed } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Section({ darkMode, cardData }) {
 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 slides
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          variableWidth: true,
        },
      },
    ],
  };

  const cardStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
  };

  const iconColor = darkMode ? '#ffffff' : '#000000';

  const iconMap = {
    wifi: faWifi,
    biking: faBiking,
    music: faMusic,
    parking: faParking,
    swimmer: faSwimmer,
    wine: faWineGlass,
    coffee: faCoffee,
    bed: faBed,
    // Add the rest of your icons here
  };

  return (
    <div className={`section ${darkMode ? "dark" : ""}`}>
      <h1>The Essentials</h1>
      <p>
        Discover comfort in a collection of hotels offering top-tier amenities.
        Benefit from high-speed Wi-Fi, secure parking, an eclectic bar, and
        comfortable rooms. Our comprehensive facilities ensure a seamless stay
        with modern conveniences, connectivity, and relaxation. Your perfect
        accommodation awaits in our diverse range of hotels, guaranteeing a
        delightful experience for every stay.
      </p>
      <Slider {...settings}>
        {(cardData || []).map((card, index) => (
          <div key={index} style={cardStyle}>
            <FontAwesomeIcon icon={iconMap[card.icon]} style={{ fontSize: '80px', color: iconColor }} />
            <h2 style={{ margin: '10px 0' }}>{card.title}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardData: state.cardData,
    darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps)(Section);

