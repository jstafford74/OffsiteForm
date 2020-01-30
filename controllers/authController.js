const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");


// Defining methods for the authController
module.exports = {
  signup: async function (req, res) {

    try {
      let preExistingUser = await db.User.findOne({
        where: {
          username: req.body.username
        }
      });
      if (preExistingUser) {
        res.status(200).json({
          success: false,
          errors: { username: 'Username already exists' }
        });
        return;
      }

      preExistingUser = await db.User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (preExistingUser) {
        res.status(200).json({
          success: false,
          errors: { email: 'Email already exists' }
        });
        return;
      }

      req.body.passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT_ROUNDS, 10));
      const newUser = await db.User.create(req.body),
        jwts = makeJwts(newUser);

      await saveRefreshToken(jwts.refresh, newUser);

      res.json({
        success: true,
        tokens: jwts
      })
    } catch (error) {
      console.log(error);
      respondWithServerError(res, error);
    }

  },

  login: async function (req, res) {
    try {
      const user = await db.User.findOne({
        where: {
          username: req.body.username
        }
      });

      if (!user) {
        res.status(200).json({
          success: false,
          errors: { username: 'User not found' }
        });
        return;
      }

      const match = await bcrypt.compare(req.body.password, user.passwordHash);

      if (match) {
        const jwts = makeJwts(user);

        await saveRefreshToken(jwts.refresh, user);

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

      const refreshToken = await db.Tokens.findOne({
        where: {
          token: decodedRefreshToken.sub,
          purpose: 'REFRESH'
        }
      });
      if (!refreshToken) {
        res.status(200).json({
          success: false,
          errors: { token: 'Refresh token not found on server.' }
        });
        return;
      }

      const user = await db.User.findOne({
        where: {
          id: refreshToken.user
        }
      }),
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
  return db.Tokens.create({
    token: sub,
    purpose: 'REFRESH',
    expiresAt: exp * 1000,
    user: user.id
  });
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
  };
}
