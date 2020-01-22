const router = require("express").Router();
const calendarController = require("../../../controllers/calendarController");

// Matches with "/api/protected/calendar"
router.route("/")
  .get(calendarController.findDates)
  .post(calendarController.createAppt);


module.exports = router;
