const router = require("express").Router();
const calendarRoutes = require("./calendar");
const profileRoutes = require("./profile");

// Profile routes
router.use("/calendar", calendarRoutes);
router.use("/profile", profileRoutes);
// router.use("/signup", signupRoutes);
module.exports = router;
