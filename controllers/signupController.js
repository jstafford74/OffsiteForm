const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");

module.exports = {
  signup: async function (req, res) {
    try {
      let preExistingUser = await db.Profile.findOne({
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
      preExistingUser = await db.Profile.findOne({
        where: {
          email: req.body.email
        }
      }
      );
      if (preExistingUser) {
        res.status(200).json({
          success: false,
          errors: { email: 'Email already exists' }
        });
        return;
      }

      const newUser = await db.Profile.create({
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
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
        passwordHash: req.body.passwordHash
      });


      // jwts = makeJwts(newUser);
      // console.log(jwts)
      // await saveRefreshToken(jwts.refresh, newUser);

      // console.log(jwts)
      res.json({
        success: true,
        // tokens: jwts,
        profile: newUser
      })
    } catch (error) { console.log(error) }

  },
}

function respondWithServerError(res, error) {
  res.status(500).json({
    success: false,
    error: { name: error.name, message: error.message }
  });
}

function makeJwts(user) {
  const access = jwt.sign(
    {
      first_Name: user.first_Name,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
      subject: user.id.toString(),
      issuer: 'readinglist-api',
      audience: 'readinglist-react-gui'
    }
  );

  const refresh = jwt.sign(
    {},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION,
      subject: randomstring.generate(),
      issuer: 'readinglist-api',
      audience: 'readinglist-react-gui'
    }
  );

  return {
    access,
    refresh
  };
}


function saveRefreshToken(token, user) {
  const { sub, exp } = jwt.decode(token);
  return db.Tokens.create({ token: sub, purpose: 'REFRESH', expiresAt: exp * 1000, user: user.id });
}
