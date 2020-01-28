/* jshint indent: 2 */
const Profile = require('./profile');

module.exports = function (sequelize, DataTypes) {
  var Tokens = sequelize.define('Tokens', {
    
    'token': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'purpose': {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "null"
    },
    'expiresAt': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'tokens'
  });

  // // Each Token has one profile and each profile has one token.
  // Tokens.associate = function (models) {
    

  // }
  return Tokens;
};
