const router = require("express").Router();
const calController = require("../../../controllers/calController");

// Matches with "/api/protected/profile"
router.route("/")
    .get(calController.getDates)
    .put(calController.viewDates);



module.exports = router;
