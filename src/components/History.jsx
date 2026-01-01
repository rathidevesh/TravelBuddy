import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import './History.css';

const History = () => {
  const context = useContext(noteContext);
  const { bookings, getallbookings } = context;
  

  // Get the logged-in user's ID from the token or wherever it is stored
  const loggedInUserId = localStorage.getItem('id');
  console.log(loggedInUserId);

  useEffect(() => {
    getallbookings(loggedInUserId); // Call getbookings with the logged-in user's ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once when the component mounts

  const calculateDateDifference = (start,end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays+1;
  };
  

  return (
    <>
      <div>
        <h1>
          <center>Bookings Till Now !</center>
        </h1>
      </div>
      
        <div className="container mx-2">
          {bookings.length === 0 && 'No bookings to display'}
        </div>

        <div className="historycontainer">
          {bookings.map((booking) => (
            <div className="history" key={booking._id}>
            <div class="card" style={{"width":"18rem"}}>
              <img src={booking.carphoto} class="card-img-top" alt="..."/>
              <div class="card-body">
                <h5 class="card-title"> Booking Id: {booking._id} </h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Vehicle Name:{booking.carname}</li>
                <li class="list-group-item">Booking From: {booking.startDate}</li>
                <li class="list-group-item">to: {booking.endDate}</li>
                <li class="list-group-item">Total Fare: Rs {booking.carcost * calculateDateDifference(booking.startDate, booking.endDate)} </li>
                <li class="list-group-item">Booking Date:{booking.date}</li>
              </ul>
            </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default History;