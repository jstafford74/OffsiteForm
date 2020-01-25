const router = require("express").Router();
const profileController = require("../../../controllers/profileController");

// Matches with "/api/protected/profile"
router.route("/")
  .get(profileController.profile)



module.exports = router;
