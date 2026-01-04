const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');
const Booking = require("../models/Booking");
const sendMail = require("../utils/sendMail");
const User = require("../models/User");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", fetchuser, async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 200 * 100, // ₹200 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});



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


// Without Paymnet
// router.post("/bookcar", fetchuser, async (req, res) => {
//   try {
//     // 1. Save booking
//     const newBooking = new Booking({
//       ...req.body,
//       bookeduser: req.user.id
//     });

//     const savedBooking = await newBooking.save();

//     // 2. Get user details
//     const user = await User.findById(req.user.id).select("email name");

//     // 3. Send booking confirmation email
//     if (user?.email) {
//       await sendMail({
//         to: user.email,
//         subject: "🚗 Booking Confirmed – Car Rental System",
//         html: `
//           <h2>Hello ${user.name},</h2>
//           <p>Your car booking has been <b>successfully confirmed</b>.</p>

//           <h3>📄 Booking Details</h3>
//           <ul>
//             <li><b>Car:</b> ${req.body.carname}</li>
//             <li><b>From:</b> ${req.body.startDate}</li>
//             <li><b>To:</b> ${req.body.endDate}</li>
//             <li><b>Cost per day:</b> ₹${req.body.carcost}</li>
//             <li><b>Contact:</b> ${req.body.mobileNumber}</li>
//           </ul>

//           <p>Thank you for choosing our service.</p>
//           <p><b>Car Rental Management System</b></p>
//         `
//       });
//     }

//     // 4. Response
//     res.json({
//       success: true,
//       booking: savedBooking
//     });

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// With Payment

router.post("/bookcar", fetchuser, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData
    } = req.body;

    // 🔐 Verify Razorpay Signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // ✅ Save booking only after payment success
    const newBooking = new Booking({
      ...bookingData,
      bookeduser: req.user.id
    });

    const savedBooking = await newBooking.save();

    // 👤 Fetch user details
    const user = await User.findById(req.user.id).select("email name");

    // 📧 Send confirmation email
    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: "🚗 Booking Confirmed – Car Rental System",
        html: `
          <h2>Hello ${user.name},</h2>
          <p>Your booking has been <b>successfully confirmed</b>.</p>

          <h3>📄 Booking Details</h3>
          <ul>
            <li><b>Car:</b> ${bookingData.carname}</li>
            <li><b>From:</b> ${bookingData.startDate}</li>
            <li><b>To:</b> ${bookingData.endDate}</li>
            <li><b>Cost per day:</b> ₹${bookingData.carcost}</li>
            <li><b>Contact:</b> ${bookingData.mobileNumber}</li>
          </ul>

          <p><b>Token Amount Paid:</b> ₹200</p>
          <p>Thank you for choosing us.</p>
        `
      });
    }

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