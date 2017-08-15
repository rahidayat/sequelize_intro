'use strict';

const helpSalt = require ('../helpers/salt')
const crypPass = require ('../helpers/encrypt')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "username sudah ada"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    role: DataTypes.STRING,
    salt: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (models) => {
        let tempPass = models.password;
        // let tempSalt = models.salt;
        models.password = crypPass (tempPass, models.salt);
        // models.salt = helpSalt();
      }
    }
  });
  return User;
};
