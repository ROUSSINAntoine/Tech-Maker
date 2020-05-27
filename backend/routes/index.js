var express = require('express');
var router = express.Router();
// var Technology = require('../models/technology.model.js');
var TechnologySemester = require('../models/technology_semester.model.js');
var Student = require('../models/student.model.js');
var Project = require('../models/project.model.js');
var ProjectTechno = require('../models/techno_project.model.js');

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
  // console.log(await Student.getStudentBySemesterId(req.params.semesterId));
  res.send(students);
});

router.get('/technologiesPerSemester/:semesterId', async function (req, res, next) {
  const technoSem = await TechnologySemester.getAssignedTechno(req.params.semesterId);
  console.log(technoSem);
  res.send(technoSem);
});

router.get('/:semesterId/:projectId/studentsNotOnProject', async function (req, res, next) {
  const students = await Student.getStudentBySemesterIdNotOnProject(req.params.semesterId, req.params.projectId);
  // console.log(await Student.getStudentBySemesterId(req.params.semesterId));
  res.send(students);
});

router.get('/:projectId/project', async function (req, res, next) {
  const project = await Project.getById(req.params.projectId);
  const students = await Student.getByProject(req.params.projectId);
  const projectTechno = await ProjectTechno.getByProjectId(req.params.projectId);

  let projectManager = null;
  for (let i = 0; i < students.length; i++) {
    if (students[i].project_manager === true) projectManager = students[i].id;
  }

  const response = {
    id: req.params.projectId,
    name: project[0].name,
    slogan: project[0].slogan,
    describe: project[0].describe,
    technologies: projectTechno.map(i => i.id),
    membersId: students.map(i => i.id),
    needs: project[0].needs,
    semesterId: students[0].semester_id,
    projectManager: projectManager
  };
  console.log(response);
  res.send(response);
});

router.put('/modifiedProject', async function (req, res, next) {
  console.log('toto');
  const project = {};

  if (req.body.projectId) project.id = req.body.projectId;
  if (req.body.name) project.name = req.body.name;
  if (req.body.slogan) project.slogan = req.body.slogan;
  if (req.body.describe) project.describe = req.body.describe;
  // if (req.body.logo) const logo = req.body.logo;
  // if (req.body.technologies) const techno = req.body.technologies;
  // if (req.body.members) const student = req.body.members;

  if (Object.keys(project).length !== 0) {
    const validCollumn = ['id', 'name', 'describe', 'slogan', 'image'];
    const collumn = Object.keys(project);
    const inputValues = Object.values(project);
    let updateValues = '';
    for (let i = 1; i < collumn.length; i++) {
      if (validCollumn.indexOf(collumn[i]) === -1) {
        console.log(collumn[i]);
        res.status('400').send('Bad Request');
        throw new Error('Invalide input');
      }
      updateValues += `${collumn[i]} = $${i + 1}`;
      if (i !== collumn.length - 1)updateValues += ', ';
    }
    Project.update(inputValues, updateValues);
  }
});

module.exports = router;
