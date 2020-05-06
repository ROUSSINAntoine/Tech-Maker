var express = require('express');
var router = express.Router();
// var Technoloy = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
// var Technoloy_semester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teacher/:id/techno', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.params.id);
  // const linkedTechno = await Technoloy_semester.getAssignedTechno(semesters);
  // const techno = Technoloy.getAll();
  // semesters.forEach(element => {
  //   semesters.checkedID = [];
  // });
  res.send(semesters);
});

module.exports = router;
