const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req,res) => {
  model.Teacher.findAll({
    include: [model.Subject],
    order: [['first_name', 'ASC']]
  })
  .then(teachers => {
    // res.send('teacher')
    console.log('..............................+++++++++++'+JSON.stringify(teachers,null,2))
    // res.render('teachers', {data: teachers})
  })
})

router.get('/add', (req,res) => {
  model.Teacher.findAll()
  .then(teachers => {
    model.Subject.findAll()
    .then(subjects => {
      // console.log(req.query.x);
      res.render('add-teacher', {data1: teachers, data2: subjects, err: req.query.x})
    })
  })
})

router.post('/add', (req,res) => {
  model.Teacher.create(req.body)
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.redirect('./add?x=Email Tidak valid')
    // res.render('add-student', {err: err.errors[0].message})
    // res.send(err.errors[0].message)
  })
})

router.get('/edit/:id', (req,res) => {
  model.Teacher.findById(req.params.id)
  .then(teacher => {
    model.Subject.findAll()
    .then(subjects => {
      // res.send('edit')
      res.render('edit-teacher', {data: teacher, data2: subjects, err: req.query.x})
    })
  })
})

router.post('/edit/:id', (req,res) => {
  model.Teacher.update(req.body,
  {
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    // console.log('--------------++++++++++++'+err);
    // res.redirect('./?x=Email Tidak valid')

  })
})

router.get('/delete/:id', (req,res) => {
  model.Teacher.destroy({
    where: {id: req.params.id}
  })
  .then(()=> {
    res.redirect('/teachers')
  })
})

module.exports = router
