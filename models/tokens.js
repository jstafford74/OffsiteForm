module.exports = function (sequelize, DataTypes) {
  var Tokens = sequelize.define('Tokens', {
    'token': {
      type: DataTypes.INTEGER,
    },
    'purpose': {
      type: DataTypes.STRING(255),
    },
    'expiresAt': {
      type: DataTypes.DATE,
    },
    'user': {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'tokens'
  });
  return Tokens;
};
