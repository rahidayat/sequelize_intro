const express = require('express')
const app = express();
const bodyParser = require('body-parser');


const index = require ('./routers/index');
const guru = require ('./routers/teachers');
const subjek = require ('./routers/subjects');
const murid = require ('./routers/students');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/', index);
app.use('/teachers', guru);
app.use('/subjects', subjek);
app.use('/students', murid);


app.listen(3000, function() {
  console.log('I am listening port 3000');
})
