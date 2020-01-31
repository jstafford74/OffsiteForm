const db = require("../models");

// Defining methods for the authController
module.exports = {
    profile: async function (req, res) {
        // console.log(req.user);
        try {
           const profile =  await db.Profile.findAll({
                where: {
                    id: req.user.id
                }
            });
            res.json(profile);
            console.log(profile)
        } catch (error) { console.log(error) }
    }
}



// first_Name: req.body.first_Name,
//     last_Name: req.body.last_Name,
//         email: req.body.email,
//             personal: req.body.personal,
//                 enterprise: req.body.enterprise,
//                     company: req.body.company,
//                         street_address: req.body.street_address,
//                             city: req.body.city,
//                                 state: req.body.state,
//                                     zip: req.body.zip,
//                                         work_phone: req.body.work_phone,
//                                             cell_phone: req.body.cell_phone,
//                                                 username: req.body.username,
//                                                     password: req.body.password

