require('dotenv').config();
const express = require("express");
const passport = require('passport');
var db = require('./models');
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

require('./auth/jwt')();



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the DB
async function startup() {
  const dbOutput = await db.sequelize.sync({ force: false });

  console.log('----------------------------');
  console.log('DATABASE SERVER CONNECTED');
  console.group('DATABASE CONFIG');
  console.table(dbOutput.config);
  console.groupEnd();

  await app.listen(PORT);
  console.log('----------------------------');
  console.log(`WEB SERVER LISTENING ON: http://localhost:${PORT}`);
}

startup();


