const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Car = require("./models/Addcar");
const Booking = require("./models/Booking");

const MONGO_URI = "mongodb://127.0.0.1:27017/travelbuddy"; 
// 👆 change DB name if needed

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    // 🔥 Clear old data (optional but recommended)
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});

    /* ================= USERS ================= */
    const password = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      { name: "Devesh Rathi", email: "deveshdiliprathi@gmail.com", password },
      { name: "Harsh Lakadwala", email: "rathidevesh906@gmail.com", password },
      { name: "Sankalp Naranje", email: "sankalpnaranje@gmail.com", password },
      { name: "Pranav Patil", email: "pranavpatil1762003@gmail.com", password },
      { name: "Asad Pangarkar", email: "pangarkarasad2@gmail.com", password },
      { name: "Tejas Patel", email: "lihashonest@gmail.com", password }
    ]);

    const owners = users.slice(0, 2);
    const customers = users.slice(2);

    /* ================= CARS ================= */
    const carTypes = ["Sedan", "SUV", "MPV", "Bike"];

    const cars = [];

    for (let i = 1; i <= 40; i++) {
      const owner = owners[i % owners.length];
      const type = carTypes[i % carTypes.length];

      cars.push({
        user: owner._id,
        name: `${type} Model ${i}`,
        description: `${type} in excellent condition`,
        cost: (500 + i * 20).toString(),
        cartype: type,
        photo: "https://via.placeholder.com/300"
      });
    }

    const savedCars = await Car.insertMany(cars);

    /* ================= BOOKINGS ================= */
    const bookings = [];

    for (let i = 1; i <= 35; i++) {
      const car = savedCars[i % savedCars.length];
      const customer = customers[i % customers.length];

      const start = new Date(2025, i % 12, 10);
      const end = new Date(2025, i % 12, 12);

      bookings.push({
        bookeduser: customer._id,
        car_id: car._id,
        mobileNumber: "9999999999",
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        carname: car.name,
        carcost: car.cost,
        carphoto: car.photo
      });
    }

    await Booking.insertMany(bookings);

    console.log("✅ SEED DATA INSERTED SUCCESSFULLY");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();
