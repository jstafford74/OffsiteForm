require('dotenv').config();

var db = require('../models');
var Usser = require("./user_class.js");

async function users() {
  let useArr = [];
  for (let i = 0; i < 15; i++) {
    useArr[i] = new Usser();
    useArr[i].makeUsserData();
  }
  
  try {
    await db.sequelize.sync({ force: true });
    const userr =  db.User.bulkCreate(useArr);
    console.log("success", userr.toJSON());
  } catch (err) {
    console.log(err, useArr)
    

  }
}
users();