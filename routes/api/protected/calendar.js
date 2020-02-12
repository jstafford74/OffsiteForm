const router = require("express").Router();
const calController = require("../../../controllers/calController");

// Matches with "/api/protected/calendar"
router.route("/")
    .get(calController.getDates);

router.route("/:date")
    .put(calController.setEvent);


module.exports = router;
