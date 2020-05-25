var express = require('express');
var router = express.Router();
var TechnologySemester = require('../models/technology_semester.model.js');
var Student = require('../models/student.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/modifiedTechnologiesPerSemester', async function (req, res, next) {
  const changes = req.body;
  for (let i = 0; i < changes.length; i++) {
    changes[i].add
      ? await TechnologySemester.add(changes[i].semesterId, changes[i].technologyId)
      : await TechnologySemester.delete(changes[i].semesterId, changes[i].technologyId);
  }

  res.end('it worked');
});

router.get('/:semesterId/Students', async function (req, res, next) {
  const students = await Student.getStudentBySemesterId(req.params.semesterId);
  console.log(await Student.getStudentBySemesterId(req.params.semesterId));
  res.send(students);
});

router.get('/:projectId/project', async function (req, res, next) {
  res.send();
});

module.exports = router;
