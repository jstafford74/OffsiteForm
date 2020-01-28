const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");

// This controller is used for authentication and logging into the app.
// Upon initial visit the user can either signup or login.
// Defining methods for the authController
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
      req.body.passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT_ROUNDS, 10));
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

      jwts = makeJwts(newUser);

      await saveRefreshToken(jwts.refresh, newUser);
      console.log(newUser)
      console.log(jwts)
      res.json({
        success: true,
        tokens: jwts
      })
    } catch (error) { console.log(error) }

  },
  login: async function (req, res) {
    try {
      const user = await db.Profile.findOne({
        where: {
          username: req.body.username,
          password: req.body.password
        }
      });

      if (!user.dataValues.first_Name) {
        res.status(200).json({
          success: false,
          errors: { username: 'User not found' }
        });
        return;
      }

      // const match = await bcrypt.compare(req.body.password, user.dataValues.passwordHash);

      if (user.dataValues.first_Name) {
        const jwts = makeJwts(user);
        console.log(user)
        await saveRefreshToken(jwts.refresh, user);

        res.json({
          success: true,
          tokens: jwts,
          user: user.dataValues
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
          issuer: 'melanoscan-api',
          audience: 'melanoscan-react-gui'
        });
      } catch (error) {
        console.log(error);
        res.status(200).json({
          success: false,
          errors: { token: 'Refresh token not valid.' }
        });
        return;
      }

      const refreshToken = await db.Tokens.findOne({ token: decodedRefreshToken.sub, purpose: 'REFRESH' });
      if (!refreshToken) {
        res.status(200).json({
          success: false,
          errors: { token: 'Refresh token not found on server.' }
        });
        return;
      }

      const user = await db.Profile.findById(refreshToken.user),
        jwts = makeJwts(user);

      await saveRefreshToken(jwts.refresh, user);

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
  return db.Tokens.create({ token: sub, purpose: 'REFRESH', expiresAt: exp * 1000, user: user.id });
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
      issuer: 'melanoscan-api',
      audience: 'melanoscan-react-gui'
    }
  );

  const refresh = jwt.sign(
    {},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION,
      subject: randomstring.generate(),
      issuer: 'melanoscan-api',
      audience: 'melanoscan-react-gui'
    }
  );

  return {
    access,
    refresh
  }
}
