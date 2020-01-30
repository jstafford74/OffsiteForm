module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {

        'firstName': { type: DataTypes.STRING },
        'lastName': { type: DataTypes.STRING },
        'username': { type: DataTypes.STRING },
        'email': { type: DataTypes.STRING },
        'passwordHash': { type: DataTypes.STRING },
        'role': { type: DataTypes.STRING, defaultValue: 'user' }
    }, {
        tableName: 'users'
    });
    return User;
};


