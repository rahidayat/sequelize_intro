const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req,res) => {
  model.Subject.findAll()
  .then(subjects => {
    // res.send('subjects')
    res.render('subjects', {data: subjects})
  })
})

module.exports = router
