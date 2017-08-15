const express = require('express');
const router = express.Router();
const model = require ('../models');
const huruf = require ('../helpers/scoreletter')

router.use((req,res,next) => {
  if(req.session.role == 'academic' || req.session.role == 'headmaster') {
    next()
  } else {
    // res.send('maaf tidak ada akses ke halaman ini')
    res.render('index', {session: req.session, msg:'Anda Tidak punya askes ke halaman Subjects'})
  }
})

router.get('/', (req,res) => {
  model.Subject.findAll({
    include: [model.Teacher],
    order: [['subject_name', 'ASC']]
  })
  .then(subjects => {
    // res.send('subjects')
    // console.log('----------------------------------------'+JSON.stringify(subjects[0]));
    res.render('subjects', {data: subjects, session:req.session})
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
    attributes: ['id', 'score'],
    where: {SubjectId: req.params.id},
    include: [{all:true}],
    order:[['Student','first_name', 'ASC']]
  })
  .then(rows => {
    // console.log('----------------------------------------'+JSON.stringify(rows, null, 2));
      if(rows.length === 0) {
        // res.render('enroled-students', {session:req.session, msg: "data tidak ada"})
        res.send('data kosong')
      } else {
        rows.forEach(r=> {
          r.letter = huruf(r.score)
        })
        // res.send(rows)
        res.render('enrolled-students', {conj: rows, session:req.session})
        // console.log('--------------BBB---------------'+rows);
        // console.log('-----------KOSOSNG---------------');

      }

  })
  .catch(err=> {
    console.log('---------ERROR------------');
  })
})

router.get('/:id/givescore', (req, res) => {
  model.StudentSubject.findAll({
    attributes: ['id'],
    where: {id: req.params.id},
    include: [{all: true}]
  })
  .then(row => {
    // res.send(row)
    res.render('givescore', {conj: row, session:req.session})
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
