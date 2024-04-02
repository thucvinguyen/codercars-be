const fs = require("fs");
const csv = require("csvtojson");
const Car = require("./models/Car");
const mongoose = require("mongoose");

const createCar = async () => {
  let carData = await csv().fromFile("data.csv");

  const mongoURI =
    "mongodb+srv://thucvi123:LS3fxhMi8EI8MNKL@cluster0.8y5teuw.mongodb.net";

  mongoose
    .connect(mongoURI)
    .then(() => console.log(`DB connected ${mongoURI}`))
    .catch((err) => console.log(err));

  carData = carData.map((e) => {
    return {
      make: e.Make,
      model: e.Model,
      style: e["Vehicle Style"],
      size: e["Vehicle Size"],
      transmission_type: e["Transmission Type"],
      price: Number(e.MSRP),
      release_date: Number(e.Year),
      isDeleted: false,
    };
  });
  // fs.writeFileSync("cars.json", JSON.stringify({ car: carData }));
  await Car.create(carData);
  console.log("done");
};
createCar();
