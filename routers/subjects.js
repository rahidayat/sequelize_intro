const express = require('express');
const router = express.Router();
const model = require ('../models');


router.get('/', (req,res) => {
  model.Subject.findAll({
    include: [model.Teacher],
    order: [['subject_name', 'ASC']]
  })
  .then(subjects => {
    // res.send('subjects')
    // console.log('----------------------------------------'+JSON.stringify(subjects[0]));
    res.render('subjects', {data: subjects})
  })
})

router.post('/', (req,res) => {
  model.Subject.create(req.body)
  .then(()=> {
    res.redirect('/subjects')
  })
})

router.get('/:id/enrolledstudents', (req,res) => {
  model.StudentSubject.findAll({
    where: {SubjectId: req.params.id},
    include: [{all:true}],
    order:[['Student','first_name', 'ASC']]
  })
  .then(rows => {
    console.log('----------------------------------------'+JSON.stringify(rows, null, 2));
    // res.render('enrolled-students', {conj: rows})
  })
  .catch(err=> {
    console.log('---------ERROR------------');
  })
})

router.get('/:id/givescore', (req, res) => {
  model.StudentSubject.findAll({
    where: {id: req.params.id},
    include: [{all: true}]
  })
  .then(row => {
    res.render('givescore', {conj: row})
  })
})

router.post('/:id/givescore', (req, res) => {
  model.StudentSubject.update({
    score: req.body.score,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where: {id: req.params.id}
  })
  .then(row => {
    res.redirect('/subjects')
  })
})

module.exports = router
