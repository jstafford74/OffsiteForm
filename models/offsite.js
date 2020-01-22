/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var Offsite = sequelize.define('Offsite', {
    
    'location': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'date': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    },
    'time': {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "null"
    },
    'company': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'contact name': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'contact email': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'contact phone': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'address': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'patient name': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'patient email': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'patient insurance co': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'patient grp number': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient member number': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient phone': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient q1': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient q2': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient q3': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient q4': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'patient q5': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'offsite_n'
  });

  return Offsite;
};


