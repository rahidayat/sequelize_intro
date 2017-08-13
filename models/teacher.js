'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: function(value,next) {
          Teacher.find({where: {email:value}})
          .then(row => {
            // console.log(row);
            if(row) {
              return next('gara2 erroo')
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
    },
    SubjectId: DataTypes.INTEGER
  });
  Teacher.associate =(models) => {
    Teacher.belongsTo(models.Subject);
  }
  return Teacher;
};
