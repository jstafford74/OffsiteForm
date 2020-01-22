require('dotenv').config();
var db = require('../models');
var Calendar = require("./calendar_class.js");
const moment = require('moment-business-days');
const fedHolidays = require('@18f/us-federal-holidays');



const start = moment('01-01-2020', 'MM-DD-YYYY');
const end = moment('12-31-2020', 'MM-DD-YYYY');
const options = { shiftSaturdayHolidays: true, shiftSundayHolidays: true };
const holidays = fedHolidays.allForYear(2020, options);

const workDates = [];
const names = [];
let dates = [];
let calArr = [];

workDays(start, end);
// This function finds all federal holidays and puts the 
// holiday name and date in MM-DD-YYYY format into seprate arrays


// This function uses the diff variable and finds all business 
// days in between the start & finish if not a federal holiday

async function workDays(start, end) {
    const diff = start.businessDiff(end);
    holidays.forEach((holi) => {
        names.push(Object.values(holi)[0]);
        dates.push(moment(Object.values(holi)[1]).utcOffset(300)._d);
        dates = dates.map(it => moment(it, 'MM-DD-YYYY')._d)


    })
    moment.updateLocale('en', {
        holidays: dates,
        holidayFormat: 'MM-DD-YYYY'
    });

    for (let i = 0; i < diff; i++) {
        let newWD = start.businessAdd(i)._d;

        if (moment(newWD).isHoliday() == false) {
            workDates.push(moment(newWD, 'MM-DD-YYYY')._d);
            calArr[i] = new Calendar();
            calArr[i].makeCalendar(moment(newWD).format('MM-DD-YYYY'));
        }

    }
    try {
        await db.sequelize.sync({ force: false });
        const calendar = db.Calendar.bulkCreate(calArr);
        console.log("success", calendar.toJSON());
    } catch (err) {
        console.log(err, calArr)
        // return patArr;

    }
}




