const db = require("../models");

// Defining methods for the calendarController
module.exports = {
  createAppt: async function (req, res) {
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
  findDates: async function (req, res) {
    try {
      await db.Calendar.findAll({
        where: {
          company: null
        }
      })

    } catch (error) { console.log(error) }
  }
};
