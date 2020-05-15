var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var PostgressStore = require('./utils/PostgressStore.js');
var indexRouter = require('./routes/index');
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

app.use('/', indexRouter);

module.exports = app;
