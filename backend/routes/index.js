var express = require('express');
var router = express.Router();
var Technology = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
var TechnologySemester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teacher/:id/techno', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.params.id);

  for (let i = 0; i < semesters.length; i++) {
    const linkedTechno = await TechnologySemester.getAssignedTechno(semesters[i].id);
    semesters[i].checkedIds = [];

    for (let j = 0; j < linkedTechno.length; j++) {
      semesters[i].checkedIds.push(linkedTechno[j].technology_id);
    }
  }
  const techno = await Technology.getAll();
  const response = {
    semesters,
    techno
  };
  res.send(response);
});

router.post('/admin/techno', async function (req, res, next) {
  const response = Technology.createTechno(req.body.name);
  res.send(response);
});

module.exports = router;
