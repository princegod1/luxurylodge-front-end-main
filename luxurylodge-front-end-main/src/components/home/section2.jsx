// Section2.jsx
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Cards from "./Cards";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Section2({ darkMode, cardsData, heading, caption }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
    }, 5000);
  
    return () => clearInterval(interval);
  }, [cardsData.length, currentIndex]);

  return (
    <div className={`section ${darkMode ? "dark" : ""}`}>
      <h1>{heading}</h1>
      <p>{caption}</p>
    <a href="/hotels">
      <Slider {...settings}>
        {cardsData.map((card, index) => (
          <div key={index} className="carousel-item">
            <Cards
              darkMode={darkMode}
              title={card.title}
              flagImageSrc={card.flag}
              backgroundImage={card.backgroundImage}
              style={{
                flex: "0 0 300px",
                margin: "0 10px",
              }}
            />
          </div>
        ))}
      </Slider>
      </a>
    </div>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(Section2);
