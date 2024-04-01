const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Handling root route request...");
  res.status(200).send("Welcome to Coder Cars!");
});

router.get("/cars/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(res, 200, true, { data: "cars" }, null, "template success");
    }
  } catch (err) {
    next(err);
  }
});

// CAR
const carAPI = require("./car.api");
router.use("/car", carAPI);

module.exports = router;
