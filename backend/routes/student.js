var express = require('express');
var router = express.Router();
// var Technology = require('../models/technology.model.js');
// // var Teacher = require('../models/teacher.model.js');
// var TechnologySemester = require('../models/technology_semester.model.js');
// var Semester = require('../models/semester.model.js');
// var User = require('../models/user.model.js');
var Student = require('../models/student.model.js');
// var Project = require('../models/project.model.js');
// var TechnoProject = require('../models/techno_project.model.js');

router.get('/', async function (req, res, next) {
  const students = await Student.getStudentData(req.session.userId);
  res.send(students[0]);
});

module.exports = router;
