const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");

// This controller is used for authentication and logging into the app.
// Upon initial visit the user can either signup or login.
// Defining methods for the authController
module.exports = {

  login: async function (req, res) {
    try {
      const user = await db.Profile.findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        }
      });
      console.log(user.dataValues);
      if (!user.dataValues.first_Name) {
        res.status(200).json({
          success: false,
          errors: { username: 'User not found' }
        });
        return;
      }

      // const match = await bcrypt.compare(req.body.password, user.passwordHash);

      if (user.dataValues.first_Name) {
        const jwts = makeJwts(user);

        // await saveRefreshToken(jwts.refresh, user);

        res.json({
          success: true,
          tokens: jwts
        })
      } else {
        res.status(200).json({
          sucess: false,
          errors: { password: 'Password is not valid' }
        });
      }

    } catch (error) {
      console.log(error);
      respondWithServerError(res, error);
    }
  },

  refresh: async function (req, res) {
    try {

      let decodedRefreshToken;
      try {
        decodedRefreshToken = jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, {
          issuer: 'readinglist-api',
          audience: 'readinglist-react-gui'
        });
      } catch (error) {
        console.log(error);
        res.status(200).json({
          success: false,
          errors: { token: 'Refresh token not valid.' }
        });
        return;
      }

      const refreshToken = await db.Token.findOne({ token: decodedRefreshToken.sub, purpose: 'REFRESH' });
      if (!refreshToken) {
        res.status(200).json({
          success: false,
          errors: { token: 'Refresh token not found on server.' }
        });
        return;
      }

      const user = await db.User.findById(refreshToken.user),
        jwts = makeJwts(user);

      // await saveRefreshToken(jwts.refresh, user);

      res.json({
        success: true,
        tokens: jwts
      })

    } catch (error) {
      console.log(error);
      respondWithServerError(res, error);
    }
  }
};

function saveRefreshToken(token, user) {
  const { sub, exp } = jwt.decode(token);
  return db.Token.create({ token: sub, purpose: 'REFRESH', expiresAt: exp * 1000, user: user._id });
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
      first_Name: user.dataValues.first_Name,
      id: user.dataValues.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
      subject: user.dataValues.id.toString(),
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