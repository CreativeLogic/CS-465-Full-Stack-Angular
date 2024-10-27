const express = require("express"); // Import Express
const router = express.Router(); // Create a Router instance
const jwt = require("jsonwebtoken"); // Enable JSON Web Tokens

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(" ");
  if (headers.length < 1) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(" ")[1];
  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.auth = verified;
    next();
  });
}

// Import the controllers that contain the route logic
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// Define route for regsistration endpoint
router.route("/register").post(authController.register);

// define route for login endpoint
router.route("/login").post(authController.login);

// Protected routes - add authenticateJWT middleware
router
  .route("/trips")
  .get(authenticateJWT, tripsController.tripsList) // GET Method: Fetch all trips
  .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method: Add a new trip

// Define a route to get a specific trip by its code
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Export the router to be used in the main app
module.exports = router;
