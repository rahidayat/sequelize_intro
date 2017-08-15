const express = require('express');
const router = express.Router();
const model = require ('../models');
const session = require('express-session');
const helpSalt = require ('../helpers/salt')
const crypPass = require ('../helpers/encrypt')


router.get('/', (req,res) => {
  res.render('index', {session: req.session, msg: null})
})

// router.get('/login', (req,res) => {
//   res.render('index', {msg: req.query.msg})
// })

router.post('/login', (req,res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
      // password: crypPass(req.body.password, )
    }
  })
  .then(userLoged => {
    if(userLoged) {
      req.session.username = userLoged.username
      req.session.password = crypPass(userLoged.password, userLoged.salt)
      req.session.role = userLoged.role
      res.redirect('/')
    }else {
      // res.redirect('/?msg=password salah')
      res.render('index', {session: req.session, msg:'username atau password salah'})
    }

  })
  .catch(err => {
    console.log('-------------+++++++++++++'+err);
  })
})

router.get('/logout', (req,res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/register', (req,res) => {
  res.render('index')
})

router.post('/register', (req,res) => {
  model.User.create({
    username: req.body.username,
    password: req.body.password,
    salt: helpSalt(),
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(user => {
    res.redirect('/')
  })
  .catch(err => {
    res.render('index', {session: req.session, msg: err.errors[0].message})
    // console.log('----------------ERRR---------'+err);
  })
})

module.exports = router
