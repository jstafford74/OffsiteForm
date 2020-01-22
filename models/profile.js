/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {

    'first_Name': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'last_Name': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: true,

    },
    'personal': {
      type: DataTypes.INTEGER(4),
      allowNull: true,

    },
    'enterprise': {
      type: DataTypes.INTEGER(4),
      allowNull: true,

    },
    'company': {
      type: DataTypes.STRING(255),
      allowNull: true,

    },
    'street_address': {
      type: DataTypes.STRING(255),
      allowNull: true,

    },
    'city': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'state': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'zip': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'work_phone': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'cell_phone': {
      type: DataTypes.STRING(45),
      allowNull: true,

    },
    'username': {
      type: DataTypes.STRING(255),
      allowNull: true,

    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: true,

    }
  }, {
    tableName: 'profile'
  });
  return Profile;
};


