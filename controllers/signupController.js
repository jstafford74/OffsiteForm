const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");

// Defining methods for the profile creation

// signedUp: async function (req, res) {

//   try {
//     let preExistingUser = await db.Profile.findAll({
//       where: {
//         username: req.body.username,
//         password: req.body.password
//       }
//     });
//     if (preExistingUser) {
//       res.status(200).json({
//         success: false,
//         errors: { username: 'Username already exists' }
//       });
//       return;
//     }

//     preExistingUser = await db.Profile.findAll({ email: req.body.email });
//     if (preExistingUser) {
//       res.status(200).json({
//         success: false,
//         errors: { email: 'Email already exists' }
//       });
//       return;
//     }

// req.body.passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT_ROUNDS, 10));
//     const newUser = await db.User.create(req.body),
//       jwts = makeJwts(newUser);

//     await saveRefreshToken(jwts.refresh, newUser);

//     res.json({
//       success: true,
//       tokens: jwts
//     })
//   } catch (error) {
//     console.log(error);
//     respondWithServerError(res, error);
//   }

// }


module.exports = {
  createNew: async function (req, res) {
    try {
      let preExistingUser = await db.Profile.findAll({
        where: {
          username: req.body.username,
          password: req.body.password
        }
      });
      if (preExistingUser) {
        res.status(200).json({
          success: false,
          errors: { username: 'Username already exists' }
        });
        return;
      }
      preExistingUser = await db.Profile.findAll({ email: req.body.email });
      if (preExistingUser) {
        res.status(200).json({
          success: false,
          errors: { email: 'Email already exists' }
        });
        return;
      }
      req.body.passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT_ROUNDS, 10));
      const newUser = await db.Profile.create({
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
        personal: req.body.personal,
        enterprise: req.body.enterprise,
        company: req.body.company,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        work_phone: req.body.work_phone,
        cell_phone: req.body.cell_phone,
        username: req.body.username,
        password: req.body.password,
        passwordHash:req.body.passwordHash
      });

      jwts = makeJwts(newUser);

      // await saveRefreshToken(jwts.refresh, newUser);

      res.json({
        success: true,
        tokens: jwts
      })
    } catch (error) { console.log(error) }

  }
}

// function saveRefreshToken(token, user) {
//   const { sub, exp } = jwt.decode(token);
//   return db.Token.create({ token: sub, purpose: 'REFRESH', expiresAt: exp * 1000, user: user._id });
// }

function respondWithServerError(res, error) {
  res.status(500).json({
    success: false,
    error: { name: error.name, message: error.message }
  });
}

function makeJwts(user) {
  const access = jwt.sign(
    {
      first_Name: user.dataValues.first_Name,
      id: user.dataValues.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
      subject: user._id.toString(),
      issuer: 'melanoscan-api',
      audience: 'melanoscan-react-gui'
    }
  );
