const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');
const Booking = require("../models/Booking");
const sendMail = require("../utils/sendMail");
const User = require("../models/User");


// router.post("/bookcar" ,  fetchuser,async(req,res) => {
//     try{
//         const newbooking = new Booking(req.body)
//         const savedbooking  =  await newbooking.save()
//         res.json(savedbooking)
//     }catch(error){
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

router.post("/bookcar", fetchuser, async (req, res) => {
  try {
    // 1. Save booking
    const newBooking = new Booking({
      ...req.body,
      bookeduser: req.user.id
    });

    const savedBooking = await newBooking.save();

    // 2. Get user details
    const user = await User.findById(req.user.id).select("email name");

    // 3. Send booking confirmation email
    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: "🚗 Booking Confirmed – Car Rental System",
        html: `
          <h2>Hello ${user.name},</h2>
          <p>Your car booking has been <b>successfully confirmed</b>.</p>

          <h3>📄 Booking Details</h3>
          <ul>
            <li><b>Car:</b> ${req.body.carname}</li>
            <li><b>From:</b> ${req.body.startDate}</li>
            <li><b>To:</b> ${req.body.endDate}</li>
            <li><b>Cost per day:</b> ₹${req.body.carcost}</li>
            <li><b>Contact:</b> ${req.body.mobileNumber}</li>
          </ul>

          <p>Thank you for choosing our service.</p>
          <p><b>Car Rental Management System</b></p>
        `
      });
    }

    // 4. Response
    res.json({
      success: true,
      booking: savedBooking
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//get all bookings of a user
router.get('/bookings',  fetchuser,async (req, res)=>{
    try{
        const booking = await Booking.find({bookeduser : req.user.id})
        res.json(booking)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router