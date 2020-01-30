require('dotenv').config();

var db = require('../models');
var { Usser, Proffile } = require("./user_class.js");
// var Proffile = require("./user_class.js");


async function users() {
  let useArr = [];
  let profArr = [];
  for (let i = 0; i < 15; i++) {
    useArr[i] = new Usser();
    useArr[i].makeUsserData();
    profArr[i] = new Proffile(useArr[i].first_Name,
      useArr[i].last_Name,
      useArr[i].email,
      useArr[i].username,
      1);

    // profArr[i] = Proffile.prototype.makeProffileData(

  }

  try {
    await db.sequelize.sync({ force: true });
    const userr = db.User.bulkCreate(useArr);
    const proff = db.Profile.bulkCreate(profArr);

    console.log("success", userr.toJSON(),proff.toJSON());
  } catch (err) {
    console.log(err, useArr)


  }
}
users();