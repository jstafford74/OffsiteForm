const router = require("express").Router();
const calendarRoutes = require("./calendar");
const signupRoutes = require("../signup");

// Profile routes
router.use("/calendar", calendarRoutes);
// router.use("/signup", signupRoutes);
module.exports = router;
