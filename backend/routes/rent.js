const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Car = require("../models/Addcar");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes
router.get("/fetchallcars",  async (req, res) => {
  try {
    const mycars = await Car.find();
    res.json(mycars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addcar",
  fetchuser,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
    body("cost", "Cost must not be blank").isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const { name, description, cost,cartype, photo } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const car = new Car({name,description,cost,cartype,photo ,user:req.user.id});
      const savedCar = await car.save();

      res.json(savedCar);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/updatecar/:id", fetchuser, async (req, res) => {
  const { name, description, cost,cartype, photo } = req.body;
  try {
    
    const newCarData = {};

    if (name) {
      newCarData.name = name;
    }
    if (description) {
      newCarData.description = description;
    }
    if (cost) {
      newCarData.cost = cost;
    }
    if (cartype) {
      newCarData.cartype = cartype;
    }
    if (photo) {
      newCarData.photo = photo;
    }

    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(400).send("Car not found");
    }

    if (car.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }

    car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: newCarData },
      { new: true }
    );

    res.json({car});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletecar/:id", fetchuser, async (req, res) => {
  try {
    
    let note = await Car.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Car.findByIdAndDelete(req.params.id);
    res.json({ "Sucess": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;