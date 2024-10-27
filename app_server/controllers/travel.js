var fs = require("fs");
var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));

const travel = async function (req, res, next) {
  try {
    const response = await fetch(tripsEndpoint, options);
    const json = await response.json();
    res.render("travel", { title: "Travlr Getaways", trips: json });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

module.exports = {
  travel,
};
