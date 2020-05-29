var express = require('express');
var router = express.Router();
var Technology = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
var TechnologySemester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');
var Users = require('../models/user.model.js');
var Student = require('../models/student.model.js');
var TechnoProject = require('../models/techno_project.model.js');

//TODO: router.use() pour vérifier si l'user à une session avec id et que c'est un admin
/*router.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await Users.getTypeById(req.session.userId);
    if (user[0] && user[0].type === 'admin') {

    }
  }
});*/

router.get('/techno', async function (req, res, next) {
  const semesters = await Semester.getAllNamesIds();

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

router.put('/techno/:technoId/rename', async function (req, res, next) {
  Technology.rename(req.params.technoId, req.body.name);
  res.end('it worked');
});

router.post('/createTechno', async function (req, res, next) {
  const techno = await Technology.getAll(req.body.name);

  for (let i = 0; i < techno.length; i++) {
    if (req.body.name.toLowerCase() === techno[i].name.toLowerCase()) {
      res
        .status('403')
        .send({ error: 'Cette technologie existe déjà.' });
      return;
    }
  }

  const technoId = await Technology.createTechno(req.body.name);
  const response = {
    name: req.body.name,
    id: technoId[0].id
  };
  res.send(response);
});

router.post('/StudentCSV', async function (req, res, next) {
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
  await Users.createStudentUser(emails);
  for (let i = 0; i < csv2.length; i++) {
    csv2[i].push(await Users.getUserByEmail(csv2[i][9]));
  }
  await Student.createStudents(csv2);
  res.send({ response: 'Les étudiants ont bien été ajouté à la base de donnée.' });
});

router.get('/semestersName', async function (req, res, next) {
  const semesters = await Semester.getAllNamesIds();
  res.send(semesters);
});

router.delete('/techno/:technoId/del', async function (req, res, next) {
  TechnoProject.delete(req.params.technoId);
  TechnologySemester.delete(req.params.technoId);
  Technology.delete(req.params.technoId);
});

router.delete('/reset', async function (req, res, next) {

});

module.exports = router;
