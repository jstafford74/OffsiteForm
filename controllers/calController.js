const db = require("../models");
const Op = db.Sequelize.Op;

// Defining methods for the calendarController
module.exports = {
    setDates: async function (req, res) {
        try {
            await db.Calendar.bulkCreate([
                req.body.date,
                req.body.company,
                req.body.first_name,
                req.body.last_Name,
                req.body.email,
                req.body.phone,
                req.body.location,
                req.body.address,
                req.body.city,
                req.body.state,
                req.body.zip,
                req.body.start_time,
                req.body.end_time,
                req.body.num_avail
            ],
                {
                    fields: [
                        'date',
                        'company',
                        'first_Name',
                        'last_Name',
                        'email',
                        'phone',
                        'location',
                        'address',
                        'city',
                        'state',
                        'zip',
                        'start_time',
                        'end_time',
                        'num_avail'],
                    updateOnDuplicate: ["date"]
                });

        } catch (error) { console.log(error) }
    },
    getDates: async function (req, res) {
        try {
            const dates = await db.Calendar.findAll({
                attributes: ['date_n'],
                where: {
                    company: {
                        [Op.ne]: null
                    }
                }
            })
            // console.log(dates)
            res.json(dates)
        } catch (error) { console.log(error) }
    }
};
