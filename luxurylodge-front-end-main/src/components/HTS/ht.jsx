
//ht page 
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../home/Nav';
import Footer from '../home/footer';
import PhotoGrid from './photo_gride';
import RoomTable from './Room_table';



function Ht({ darkMode }) {

  const [parsedSelectedHotelData, setParsedSelectedHotelData] = useState(null);
  // console.log(parsedSelectedHotelData)

  useEffect(() => {
    // Retrieve data from local storage
    const storedSelectedHotelData = localStorage.getItem('selectedHotelData');
    const parsedData = storedSelectedHotelData ? JSON.parse(storedSelectedHotelData) : "";


    setParsedSelectedHotelData(parsedData);
  }, []);
  const [selectedRooms, setSelectedRooms] = useState(null);




  const rooms = [
    { roomType: 'Deluxe Room', availableRooms: [101, 102, 103], guests: 2, pricePerNight: '$150', description: [" 1 extra-large double bed", "Air conditioning Flat-screen TV Free WiFi "] },
    { roomType: 'Suite', availableRooms: [201, 202, 203], guests: 4, pricePerNight: '$250', description: ["Single person room that has a single of each thing"] },
    { roomType: 'Family Room', availableRooms: [301, 302, 303], guests: 6, pricePerNight: '$350', description: ["1 extra-large double bed Bath", "Air conditioning Private", "bathroom Flat-screen TV Free WiFi", "Free toiletries Shower", "Safety deposit box", "Toilet Towels Desk Slippers", "Heating Fan Outdoor dining area Wardrobe or closet", "Dining area Dining table Clothes rack Toilet paper"] },
    // Add more rooms as needed
  ];









  return (
    <div >
      <Nav />
      <div className={`section ${darkMode ? "dark" : ""}`}>
        <h1>Explore</h1>
        <p>Explore a world of possibilities as you navigate through our user-friendly
          platform, designed to elevate your booking experience. Immerse yourself in a
          collection of exquisite accommodations, discover exclusive deals, and tailor
          your stay to perfection. From luxurious suites to cozy retreats, our system opens
          the door to a spectrum of choices, ensuring your journey is as unique as your
          destination. With intuitive features, real-time availability, and a commitment
          to exceptional service, embark on a stress-free journey of reserving the perfect
          stay. Your ideal hotel experience begins here, where every click brings you closer
          to a memorable adventure
        </p>
        <hr />
        <br />
        {parsedSelectedHotelData && parsedSelectedHotelData.length > 0 && (
          <>
            <h1>{parsedSelectedHotelData[0].name}</h1>
            <h3>{parsedSelectedHotelData[0].address}</h3>
            <br />
            <PhotoGrid hotels={parsedSelectedHotelData} />
            <br />
            {/* <p>{hotelDetails.description.description}</p> */}
            <RoomTable
              rooms={rooms}
              onSelectRooms={(rooms) => setSelectedRooms(rooms)}
              hotelname={parsedSelectedHotelData[0].name}
            />
           
          </>

        )}
        <Footer />
      </div>
    </div>
  );


}


const mapStateToProps = (state) => ({
  darkMode: state.darkMode,

});

export default connect(mapStateToProps)(Ht);