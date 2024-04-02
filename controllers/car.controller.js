const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError("Invalid input", 402);
    const created = await Car.create(info);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Car created successfully"
    );
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    // YOUR CODE HERE
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    // YOUR CODE HERE
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    // YOUR CODE HERE
  }
};

module.exports = carController;
