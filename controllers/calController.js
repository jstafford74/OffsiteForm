const db = require("../models");
const Op = db.Sequelize.Op;

// Defining methods for the calendarController
module.exports = {
    setEvent: async function (req, res) {
        console.log(req.body)
        try {
            const event = await db.Calendar.update({
                company: req.body.company,
                first_Name: req.body.first_Name,
                email: req.body.email,
                phone: req.body.phone,
                location: req.body.location,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                num_avail: req.body.num_avail
            }, {
                where: {
                    date_n: req.params.date
                }
            })
            return res.status(201).json({
                event,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getDates: async function (req, res) {
        try {
            let dates = await db.Calendar.findAll({
                attributes: ['date_n'],
                where: {
                    company: {
                        [Op.ne]: null
                    }
                }
            })

            res.json(dates)
        } catch (error) { console.log(error) }
    }
};
