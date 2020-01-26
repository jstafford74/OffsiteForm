const router = require("express").Router();
const calController = require("../../../controllers/calController");

// Matches with "/api/protected/calendar"
router.route("/")
    .get(calController.getDates)
    .put(calController.setDates);



module.exports = router;
