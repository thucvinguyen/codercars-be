const fs = require("fs");
const csv = require("csvtojson");

const createCar = async () => {
  let carData = await csv().fromFile("data.csv");

  carData = carData.map((e) => {
    return {
      make: e.Make,
      model: e.Model,
      style: e["Vehicle Style"],
      size: e["Vehicle Size"],
      transmission_type: e["Transmission Type"],
      price: e.MSRP,
      release_date: e.Year,
      isDeleted: false,
    };
  });
  fs.writeFileSync("cars.json", JSON.stringify({ car: carData }));
  console.log("done");
};
createCar();
