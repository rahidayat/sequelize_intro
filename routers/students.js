const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req,res) => {
  model.Student.findAll({
    order: [['first_name', 'ASC']]
  })
  .then(students => {
    // res.send('teacher')
    res.render('students', {data: students})
  })
})

router.get('/add', (req,res) => {
  // console.log(req.query.x);
  res.render('add-student', {err: req.query.x})
})

router.post('/add', (req,res) => {
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.redirect('./add?x=Email Tidak valid')
    // res.render('add-student', {err: err.errors[0].message})
    // res.send(err.errors[0].message)
  })
})

router.get('/edit/:id', (req,res) => {
  model.Student.findById(req.params.id)
  .then(row => {
    // res.send('edit')
    res.render('edit-student', {data: row})
  })
})

router.post('/edit/:id', (req,res) => {
  model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    // createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/students')
  })
})

router.get('/delete/:id', (req,res) => {
  model.Student.destroy({
    where: {id: req.params.id}
  })
  .then(()=> {
    res.redirect('/students')
  })
})

router.get('/:id/addsubject', (req,res)=> {
  model.Student.findById(req.params.id)
  .then(student=> {
    model.Subject.findAll()
    .then(subjects=> {
      res.render('add-subject-to-student', {data1: student, data2:subjects})
    })
  })
})

router.post('/:id/addsubject', (req,res)=> {
  model.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(rows => {
    res.redirect('/students')
  })
})

module.exports = router
