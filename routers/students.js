const express = require('express');
const router = express.Router();
const model = require ('../models');
const session = require('express-session');

router.use((req,res,next) => {
  if(req.session.role == 'teacher' || req.session.role == 'academic' || req.session.role == 'headmaster') {
    next()
  } else {
    // res.send('maaf tidak ada akses ke halaman ini')
    // res.sendStatus(401)
    res.render('index', {session: req.session, msg:'Anda Tidak punya askes ke halaman Student'})
  }
})

router.get('/', (req,res) => {
  model.Student.findAll({
    order: [['first_name', 'ASC']]
  })
  .then(students => {
    // res.send('teacher')
    res.render('students', {data: students, session:req.session})
  })
})

router.get('/add', (req,res) => {
  // console.log(req.query.x);
  res.render('add-student', {session:req.session, err: req.query.x})
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
    res.render('edit-student', {data: row, session:req.session})
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
      res.render('add-subject-to-student', {data1: student, data2:subjects, session:req.session})
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
