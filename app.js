const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());



const index = require ('./routers/index');
const guru = require ('./routers/teachers');
const subjek = require ('./routers/subjects');
const murid = require ('./routers/students');
// const login = require ('./routers/login');

app.use('/', index);
app.use('/teachers', guru);
app.use('/subjects', subjek);
app.use('/students', murid);
// app.use('/login', login);


app.listen(process.env.PORT || 3000);
