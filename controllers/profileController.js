const db = require("../models");

// Defining methods for the authController
module.exports = {
    profile: async function (req, res) {
        // console.log(req.user);
        try {
            const profile = await db.Profile.findAll({
                where: {
                    id: req.user.id
                }
            });
            res.json(profile);
            console.log(profile);
        } catch (error) { console.log(error) }
    }
}


