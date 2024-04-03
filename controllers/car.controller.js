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
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  try {
    const cars = await Car.find({ isDeleted: false }).skip(skip).limit(limit);
    const total = 1000;

    sendResponse(res, 200, true, { cars, page, total }, null, "List of cars");
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  const targetId = req.params.id;
  const updateInfo = req.body;
  const options = { new: true };
  try {
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    if (!updated) {
      return next(new Error("Car not found"));
    }
    sendResponse(
      res,
      200,
      true,
      { car: updated },
      null,
      "Car updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;
  const options = { new: true };
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );
    if (!updatedCar) throw new AppError("Car not found", 404);
    sendResponse(
      res,
      200,
      true,
      { car: updatedCar },
      null,
      "Car deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
