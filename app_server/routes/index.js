const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travel");

router.route("/trips").get(travelController.travel);

module.exports = router;
