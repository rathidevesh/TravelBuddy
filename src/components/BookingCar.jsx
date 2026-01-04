import React, { useContext, useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import History from './History';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const BookingCar = (props) => {
  const location = useLocation();
  const { carid, carname, cardescription, carcost, carphoto } = location.state || {};
  const context = useContext(noteContext);
  const { bookings, getallbookings , getbookings } = context;
   let history = useNavigate();

  useEffect(() => {
    getallbookings(); 
  }, []); 

  useEffect(() => { console.log("Bookings:", bookings); }, [bookings]);

  const [mobileNumber, setMobileNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const startDateValue = e.target.value;
    setStartDate(startDateValue);
  };

  const handleEndDateChange = (e) => {
    const endDateValue = e.target.value;
    setEndDate(endDateValue);
  };

  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays+1;
  };

  const defbtwtrip = calculateDateDifference();
  const tripcost = parseInt(carcost);
  const totalcostoftrip = defbtwtrip * tripcost;

  

  const [booking, setBooking] = useState({
    bookeduser: localStorage.getItem('id'),
    car_id: carid,
    mobileNumber: '',
    startDate: '',
    endDate: '',
    carname: carname,
    carcost: carcost,
    carphoto: carphoto,
  });


  // Without Payment
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   // Check if the car is already booked for the selected dates
  //   const isCarBooked = bookings.some((booking) => {
  //     const bookingStartDate = new Date(booking.startDate);
  //     const bookingEndDate = new Date(booking.endDate);
  //     const selectedStartDate = new Date(startDate);
  //     const selectedEndDate = new Date(endDate);
  
  //     // Check if the selected dates overlap with any existing booking
  //     return (
  //       booking.car_id === carid &&
  //       (
  //         ((Math.max(bookingStartDate, selectedStartDate)) < Math.min(bookingEndDate,selectedEndDate))
  //       )
  //     );
      
  //   });
  
  //   if (isCarBooked) {
  //     alert('This car is already booked for the selected dates. Please choose different dates.');
  //   } else {
  //     // Proceed with the booking
  //     getbookings(
  //       booking.bookeduser,
  //       booking.car_id,
  //       mobileNumber,
  //       startDate,
  //       endDate,
  //       booking.carname,
  //       booking.carcost,
  //       booking.carphoto
  //     );
  //     console.log('Booking Successful');
  //     setBooking({
  //       bookeduser: localStorage.getItem('id'),
  //       car_id: carid,
  //       mobileNumber: mobileNumber,
  //       startDate: startDate,
  //       endDate: endDate,
  //       carname: carname,
  //       carcost: totalcostoftrip,
  //       carphoto: carphoto,
  //     });
  //      history("/history")
  //   }
  // };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check overlapping bookings
  const isCarBooked = bookings.some((booking) => {
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    return (
      booking.car_id === carid &&
      Math.max(bookingStartDate, selectedStartDate) <
      Math.min(bookingEndDate, selectedEndDate)
    );
  });

  if (isCarBooked) {
    alert("This car is already booked for selected dates");
    return;
  }

  // Load Razorpay
  const res = await loadRazorpay();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // Create order
  const orderRes = await fetch(
    "http://localhost:5000/api/Bookingsroute/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    }
  );

  const orderData = await orderRes.json();

  const options = {
    key: "rzp_test_RT2cv0jcxdEeZN", // 🔴 your Razorpay test key
    amount: orderData.amount,
    currency: "INR",
    name: "TravelBuddy",
    description: "Car Booking Token",
    order_id: orderData.id,

    handler: async function (response) {
      // Call backend booking AFTER payment
      await getbookings(
        response,
        {
          car_id: carid,
          mobileNumber,
          startDate,
          endDate,
          carname,
          carcost: totalcostoftrip,
          carphoto,
        }
      );

      history("/history");
    },

    theme: { color: "#28a745" },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};


  return (
    <>
    <h2 style={{textAlign:"center","padding":"20px",fontSize:"35px","fontFamily":"Playfair Display', serif"}}>Booking Details</h2>
        <div className="container">
            <div class="card mb-3" style={{"maxWidth": "800px","maxHeight":"800px"}}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src={carphoto} class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title1">{carname}</h5>
                    <p class="card-text">Car Id : {carid}</p>
                    <p class="card-text">About your Fleet : {cardescription}</p>
                    <p class="card-text">Cost(Rs/day) : Rs {carcost}</p>
                    
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="container">
            <div class="card mb-3" style={{"maxWidth": "800px","maxHeight":"800px"}}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                      <input type="text" className="form-control" id="modileNumber" name='mobileNumber' value={mobileNumber} onChange={handleMobileNumberChange} aria-describedby="emailHelp" required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Start Date</label>
                      <input type="date" className="form-control" id="startDate" name='startDate' value={startDate} onChange={handleStartDateChange} aria-describedby="emailHelp" required/>
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">End Date</label>
                      <input type="date" className="form-control" id="endDate" name='endDate' value={endDate} onChange={handleEndDateChange} required />
                  </div>
                  <div className="mb-3">
                      <p>Overall Cost Is: {defbtwtrip * tripcost}</p>
                  </div>
                  
                  <button type="submit" className="btn btn-outline-success">Book & Pay ₹200</button>
              </form>
            </div>
          </div>
        </div>
        
    </>
  );
};

export default BookingCar;
