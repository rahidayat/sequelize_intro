const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req,res) => {
  model.Teacher.findAll()
  .then(teachers => {
    // res.send('teacher')
    res.render('teachers', {data: teachers})
  })
})

module.exports = router
