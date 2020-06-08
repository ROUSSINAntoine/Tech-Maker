const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const PostgressStore = require('./utils/PostgressStore.js');
const indexRouter = require('./routes/index');
const teacherRouter = require('./routes/teacher.js');
const studentRouter = require('./routes/student.js');
const adminRouter = require('./routes/admin.js');
const cors = require('cors');
const bodyParser = require('body-parser');
PostgressStore.init();

const app = express();

app.use(bodyParser(bodyParser.json()));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));

app.use(session({
  secret: require('./server.config.js').secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/', indexRouter);

module.exports = app;
