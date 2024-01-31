// Section4.jsx
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Section4 = ({ darkMode, data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={`section ${darkMode ? "dark" : ""}`}>
      <h1>Testimonials</h1>
      <p>Discover how our exceptional service and attention to detail at [Your Company Name] have made a lasting impact on our valued customers. Read through their experiences and testimonials, as we strive to offer outstanding services that create memorable and extraordinary moments for every individual.</p>

      <Slider {...settings}>
        {data.map((datas) => (
          <div key={datas.id} className="testimonial-card">
            <img src={datas.avatar} alt={datas.name} />
            <h2>{datas.name}</h2>
            <p>{datas.message}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(Section4);
