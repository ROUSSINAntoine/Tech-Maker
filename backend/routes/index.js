var express = require('express');
var router = express.Router();
var Technoloy = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
var TechnoloySemester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teacher/:id/techno', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.params.id);
  for (let i = 0; i < semesters.length; i++) {
    semesters[i].checkedIds = [];
    const linkedTechno = await TechnoloySemester.getAssignedTechno(semesters[i].id);
    for (let j = 0; j < linkedTechno.length; j++) {
      semesters[i].checkedIds.push(linkedTechno[j].technology_id);
    }
  }
  const techno = await Technoloy.getAll();
  // semesters.forEach(element => {
  //   semesters.checkedID = [];
  // });
  const response = {
    semesters,
    techno
  };
  res.send(response);
});

module.exports = router;
