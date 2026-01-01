const express = require('express');
const router = express.Router();
const Car = require('../models/Addcar');
const Booking = require('../models/Booking');
const fetchUser = require('../middleware/fetchUser');

/* ===================== SUMMARY ===================== */
router.get('/summary', fetchUser, async (req, res) => {
  const userId = req.user.id;

  const myCars = await Car.find({ user: userId }).select('_id');

  const totalVehicles = myCars.length;
  const totalBookings = await Booking.countDocuments({ bookeduser: userId });

  const activeBookings = await Booking.countDocuments({
    bookeduser: userId,
    startDate: { $lte: new Date().toISOString() },
    endDate: { $gte: new Date().toISOString() }
  });

  const earningsAgg = await Booking.aggregate([
    { $match: { car_id: { $in: myCars.map(c => c._id) } } },
    { $group: { _id: null, total: { $sum: { $toDouble: "$carcost" } } } }
  ]);

  const spendingAgg = await Booking.aggregate([
    { $match: { bookeduser: userId } },
    { $group: { _id: null, total: { $sum: { $toDouble: "$carcost" } } } }
  ]);

  res.json({
    totalVehicles,
    totalBookings,
    activeBookings,
    totalEarnings: earningsAgg[0]?.total || 0,
    totalSpending: spendingAgg[0]?.total || 0
  });
});

/* ===================== MY VEHICLES ===================== */
router.get('/my-vehicles', fetchUser, async (req, res) => {
  res.json(await Car.find({ user: req.user.id }));
});

/* ===================== MY BOOKINGS ===================== */
router.get('/my-bookings', fetchUser, async (req, res) => {
  res.json(await Booking.find({ bookeduser: req.user.id }));
});

/* ===================== BOOKINGS ON MY VEHICLES ===================== */
router.get('/vehicle-bookings', fetchUser, async (req, res) => {
  const myCars = await Car.find({ user: req.user.id }).select('_id');
  res.json(await Booking.find({ car_id: { $in: myCars } }));
});

/* ===================== MONTHLY REVENUE ===================== */
router.get('/monthly-revenue', fetchUser, async (req, res) => {
  const userId = req.user.id;
  const myCars = await Car.find({ user: userId }).select('_id');

  const earnings = await Booking.aggregate([
    { $match: { car_id: { $in: myCars.map(c => c._id) } } },
    {
      $group: {
        _id: { $month: { $toDate: "$date" } },
        total: { $sum: { $toDouble: "$carcost" } }
      }
    }
  ]);

  const spending = await Booking.aggregate([
    { $match: { bookeduser: userId } },
    {
      $group: {
        _id: { $month: { $toDate: "$date" } },
        total: { $sum: { $toDouble: "$carcost" } }
      }
    }
  ]);

  res.json({ earnings, spending });
});

/* ===================== BOOKINGS PER MONTH ===================== */
router.get('/bookings-per-month', fetchUser, async (req, res) => {
  res.json(await Booking.aggregate([
    {
      $group: {
        _id: { $month: { $toDate: "$date" } },
        count: { $sum: 1 }
      }
    }
  ]));
});

/* ===================== VEHICLE TYPES ===================== */
router.get('/vehicle-types', fetchUser, async (req, res) => {
  res.json(await Car.aggregate([
    { $group: { _id: "$cartype", count: { $sum: 1 } } }
  ]));
});

module.exports = router;
