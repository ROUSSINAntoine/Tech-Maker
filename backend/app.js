var express = require('express');
// var session = require('express-session');
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

var app = express();
app.use(bodyParser(bodyParser.json()));
app.use(cors());
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
