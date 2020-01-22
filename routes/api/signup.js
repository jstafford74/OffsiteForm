const router = require("express").Router();
const signupController = require("../../controllers/signupController");

// Matches with "/api/signup"
router.route("/")
  .post(signupController.createNew)


module.exports = router;
