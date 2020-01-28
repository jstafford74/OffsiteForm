const router = require("express").Router();
const passport = require('passport');

const protectedRoutes = require("./protected");
const authRoutes = require("./auth");


// Profile routes
router.use("/auth", authRoutes); //This contains "/login" & "/refresh"

router.use("/protected", passport.authenticate('jwt', { session: false }), protectedRoutes);
module.exports = router;
