require('dotenv').config();
var db = require('../models');
var Profile = require("./profile_class.js");

async function profiles() {
  let proArr = [];
  for (let i = 0; i < 15; i++) {
    proArr[i] = new Profile();
    proArr[i].makeProfileData();
  }
  
  try {
    await db.sequelize.sync({ force: false });
    const profiler =  db.Profile.bulkCreate(proArr);
    console.log("success", profiler.toJSON());
  } catch (err) {
    console.log(err, proArr)
    // return patArr;

  }
}
profiles();