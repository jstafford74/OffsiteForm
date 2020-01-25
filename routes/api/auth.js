const router = require("express").Router();
const authController = require("../../controllers/authController");
const signupController = require("../../controllers/signupController");

// see http://www.passportjs.org/docs/
// Matches with "/api/auth/login"
router.route("/login")
  .post(authController.login);

  router.route("/signup")
  .post(signupController.createNew);

// Matches with "/api/auth/refresh"
router.route("/refresh")
  .post(authController.refresh);

module.exports = router;
