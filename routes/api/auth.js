const router = require("express").Router();
const authController = require("../../controllers/authController");


// see http://www.passportjs.org/docs/
// Matches with "/api/auth/login"
router.route("/login")
  .post(authController.login);

// Matches with "/api/auth/refresh"
router.route("/refresh")
  .post(authController.refresh);

module.exports = router;
