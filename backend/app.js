var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var PostgressStore = require('./utils/PostgressStore.js');
var indexRouter = require('./routes/index');
var teacherRouter = require('./routes/teacher.js');
var studentRouter = require('./routes/student.js');
var adminRouter = require('./routes/admin.js');
const cors = require('cors');
const bodyParser = require('body-parser');
PostgressStore.init();

function getRandomString () {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 20; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}


var app = express();
app.use(bodyParser(bodyParser.json()));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));
app.use(session({
  secret: getRandomString(),
  resave: false,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/', indexRouter);

module.exports = app;
