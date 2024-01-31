import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../signup/firebase';
import Nav from '../home/Nav';
import Footer from '../home/footer';

function ReservationList({ darkMode }) {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!user) {
          console.log("No user signed in.");
          return;
        }

        const reservationsCollection = collection(getFirestore(), 'Reservations');
        const userReservationsQuery = query(reservationsCollection, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(userReservationsQuery);
        const userReservations = [];
        querySnapshot.forEach((doc) => {
          userReservations.push({ id: doc.id, ...doc.data() });
        });
        setReservations(userReservations);

      } catch (error) {
        console.error('Error fetching reservations:', error.message);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);



  return (
    <div>
      <Nav />
      <br />
      <br />

      <div className={`reservation-list-container ${darkMode ? "dark" : ""}`}>
        <br />
        <br />
        <h2 className="heading_reserve">Your Reservations</h2>
        <div className="reservation-cards-container">
          {reservations.map((reservation) => (
            <div key={reservation.id} className={`card_reserve ${darkMode ? "dark" : ""}`}>
              <div className="card-content">
                <h3>{reservation.roomType}</h3>
                <p>Room Number: {reservation.roomNumber}</p>
                <p>Number of Guests: {reservation.numberOfGuests}</p>
                <p>Check In: {reservation.CheckIn}</p>
                <p>Check Out: {reservation.CheckOut}</p>
                <p>Total Amount: {reservation.Totalamount}</p>
                <p>Status: {reservation.status}</p>
              </div>
              <img src={reservation.Image} alt="Room" className="room-image" />

            </div>

          ))}
        </div>
      </div>

      <Footer />
    </div>

  );
}

const mapStateToProps = (state) => ({
  darkMode: state.darkMode,
});

export default connect(mapStateToProps)(ReservationList);
