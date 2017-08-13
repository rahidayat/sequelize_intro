'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: function(value,next) {
          Student.find({where: {email:value}})
          .then(row => {
            // console.log(row);
            if(row) {
              return next(alert('ini salah'))
            } else {
              return next()
            }
            // console.log(this.id);
            // if(row && row.id !=this.id) {
            //
            // }
            // return (row && row.id !=this.id) ? next('Email telah digunakan!') : next()
          })
          .catch(err => {
            return next(err)
          })
        }
      }
    }
  });
  Student.associate=(models) => {
    Student.belongsToMany(models.Subject, {through: "StudentSubject"});
  }
  return Student;
};
