var express = require('express');
var router = express.Router();
var Technology = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
var TechnologySemester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');
var User = require('../models/user.model.js');
var Student = require('../models/student.model.js');

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
  const technologies = await Technology.getAll();
  const response = {
    semesters,
    technologies
  };
  res.send(response);
});

router.post('/admin/techno', async function (req, res, next) {
  const response = Technology.createTechno(req.body.name);
  res.send(response);
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

router.post('/admin/StudentCSV', async function (req, res, next) {
  let csv0 = req.body.csv.replace(/(\r\n)/g, ';');
  csv0 = csv0.replace(/\s/g, '');
  const csv1 = csv0.split(';');
  const csv2 = [];

  let ligne = [];
  let j = 0;
  for (let i = 0; i < csv1.length; i++) {
    ligne.push(csv1[i]);
    j++;
    if (j === 10 && i !== 0) {
      csv2.push(ligne);
      ligne = [];
      j = 0;
    }
  }
  // console.log(csv2);
  const emails = [];
  for (let i = 0; i < csv2.length; i++) {
    switch (csv2[i][6]) {
      case 'IT-S01-A':
        csv2[i][6] = '1';
        break;
      case 'IT-S02-A':
        csv2[i][6] = '2';
        break;
      case 'IT-S03-IL':
        csv2[i][6] = '3';
        break;
      case 'IT-S03-SR':
        csv2[i][6] = '4';
        break;
      case 'IT-S04-IL':
        csv2[i][6] = '5';
        break;
      case 'IT-S04-SR':
        csv2[i][6] = '6';
        break;
      case 'IT-S05-IL':
        csv2[i][6] = '7';
        break;
      case 'IT-S05-SR':
        csv2[i][6] = '8';
        break;
      default:
        csv2.splice(i, 1);
        i--;
        break;
    }
  }

  for (let i = 0; i < csv2.length; i++) {
    emails.push(csv2[i][9]);
  }
  await User.createStudentUser(emails);
  for (let i = 0; i < csv2.length; i++) {
    csv2[i].push(await User.getUserByEmail(csv2[i][9]));
  }
  await Student.createStudents(csv2);
});

router.get('/teacher/:id/semesters', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.params.id);
  res.send(semesters);
});

router.get('/admin/semestersName', async function (req, res, next) {
  const semesters = await Semester.getAllNamesIds();
  res.send(semesters);
});
module.exports = router;
