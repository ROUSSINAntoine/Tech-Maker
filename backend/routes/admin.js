const express = require('express');
const router = express.Router();
const Technology = require('../models/technology.model.js');
// var Teacher = require('../models/teacher.model.js');
const TechnologySemester = require('../models/technology_semester.model.js');
const Semester = require('../models/semester.model.js');
const Users = require('../models/user.model.js');
const Student = require('../models/student.model.js');
const TechnoProject = require('../models/techno_project.model.js');
const Position = require('../models/position.model.js');
const JuryProject = require('../models/jury_project.model.js');
const StudentJudge = require('../models/student_judge.model.js');
const Judge = require('../models/judge.model.js');
const Jury = require('../models/jury.model');
const Project = require('../models/project.model.js');
const Room = require('../models/room.model.js');
const RenderPDF = require('chrome-headless-render-pdf');

router.get('/techno', async function (req, res, next) {
  const semesters = await Semester.getAllNamesIds();

  for (let i = 0; i < semesters.length; i++) {
    const linkedTechno = await TechnologySemester.getAssignedTechno(semesters[i].id);
    semesters[i].checkedIds = [];

    for (let j = 0; j < linkedTechno.length; j++) {
      semesters[i].checkedIds.push(linkedTechno[j].id);
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

router.post('/studentCSV', async function (req, res, next) {
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
  console.log('reset');
  await Position.empty();
  await TechnoProject.empty();
  await JuryProject.empty();
  await StudentJudge.empty();
  await Student.empty();
  await Users.emptyStudent();
  await Judge.empty();
  await Jury.empty();
  await Project.empty();
});

router.get('/rooms', async (req, res) => {
  const rooms = await Room.getAllRooms();
  res.status(200).send(rooms);
});

router.put('/rooms/update', async (req, res) => {
  if (req.session.userType !== 'admin') {
    res.status(403).send({ error: true, message: "Vous n'avez pas l'autorisation de modification des salles." });
    return;
  }

  const avalibleColumns = ['name', 'max_student', 'max_project', 'max_student_per_project', 'color', 'usable'];

  for (let i = 0; i < req.body.length; i++) {
    const params = [];
    const values = [req.body[i].id];
    for (let j = 0; j < avalibleColumns.length; j++) {
      if (req.body[i][avalibleColumns[j]] !== undefined) {
        values.push(req.body[i][avalibleColumns[j]]);
        params.push(`${avalibleColumns[j]} = $${values.length}`);
      }
    }
    console.log(`UPDATE ${Room.tableName} SET ${params.join(', ')} WHERE id = $1`, values);
    await Room.update(params.join(', '), values);
  }

  res.status(200).send({ error: false, message: 'Opération effectuée avec succès.' });
});

router.post('/createRoom', async function (req, res, next) {
  Room.newRoom(req.body.name, req.body.max_student, req.body.max_project, req.body.max_student_per_project, req.body.color)
});

router.post('/juryCSV', async function (req, res, next) {
  // RenderPDF.default.
  RenderPDF.default.generateSinglePdf('http://google.com', 'outputPdf.pdf', {chromeBinary : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'});
  res.send({ response: 'Les étudiants ont bien été ajouté à la base de donnée.' });
});

router.get('pdf', async function (req, res, next) {
  RenderPDF.default.generateSinglePdf(``, `${__dirname}/../pdf/${req.body.name}.pdf`)
})

module.exports = router;
