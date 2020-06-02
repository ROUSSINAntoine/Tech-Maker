const express = require('express');
const router = express.Router();
// var Technology = require('../models/technology.model.js');
const TechnologySemester = require('../models/technology_semester.model.js');
const Student = require('../models/student.model.js');
const User = require('../models/user.model.js');
const Project = require('../models/project.model.js');
const ProjectTechno = require('../models/techno_project.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/modifiedTechnologiesPerSemester', async function (req, res, next) {
  const changes = req.body;
  for (let i = 0; i < changes.length; i++) {
    changes[i].add
      ? await TechnologySemester.add(changes[i].semesterId, changes[i].technologyId)
      : await TechnologySemester.deasign(changes[i].semesterId, changes[i].technologyId);
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
    technologies: projectTechno.map(i => i.technology_id),
    membersId: students.map(i => i.id),
    needs: project[0].needs,
    semesterId: students[0].semester_id,
    projectManager: projectManager
  };
  console.log(response);
  res.send(response);
});

router.post('/login', async (req, res) => {
  const user = await User.getUserByEmailPassword(req.body.email, req.body.password);
  if (!user) {
    res.status(401).send({ error: 'Idenfifiants invalides.' });
  } else {
    req.session.userId = user.id;
    req.session.userType = user.type;
    res.status(200).send({ route: user.type });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.userId) {
    delete req.session.userId;
    delete req.session.userType;
    res.status(200).send('Disconnected');
  } else {
    res.status(401).send('Already disconnected');
  }
});

router.get('/connected', (req, res) => {
  if (req.session.userId) {
    res.status(200).send({ connected: true, userType: req.session.userType });
  } else {
    res.status(401).send({ connected: false });
  }
});

router.put('/modifiedProject', async function (req, res, next) {
  const project = {};
  const student = [];
  let logo;
  let projectManager = {};
  let techno = [];
  if (req.body.projectId) project.id = req.body.projectId;
  if (req.body.name) project.name = req.body.name;
  if (req.body.slogan) project.slogan = req.body.slogan;
  if (req.body.describe) project.describe = req.body.describe;
  if (req.body.logo) logo = req.body.logo;
  if (req.body.technologies) techno = req.body.technologies;
  if (req.body.membersId) student.push(...req.body.membersId);
  if (req.body.projectManager) projectManager = req.body.projectManager;

  console.log(req.body);

  if (Object.keys(project).length !== 1) {
    const validCollumn = ['id', 'name', 'describe', 'slogan', 'image'];
    const collumn = Object.keys(project);
    const inputValues = Object.values(project);
    let updateValues = '';
    for (let i = 1; i < collumn.length; i++) {
      if (validCollumn.indexOf(collumn[i]) === -1) {
        res.status('400').send('Bad Request');
        throw new Error('Invalide input');
      }
      updateValues += `${collumn[i]} = $${i + 1}`;
      if (i !== collumn.length - 1)updateValues += ', ';
    }
    Project.update(inputValues, updateValues);
  }

  if (techno.length !== 0) {
    for (let i = 0; i < techno.length; i++) {
      techno[i].add
        ? await ProjectTechno.add(project.id, techno[i].id)
        : await ProjectTechno.deasign(project.id, techno[i].id);
    }
  }

  if (student.length !== 0) {
    for (let i = 0; i < student.length; i++) {
      student[i].add
        ? await Student.addProject(project.id, student[i].id)
        : await Student.quitProject(student[i].id);
    }
  }

  if (projectManager !== {}) {
    console.log(projectManager);
    Student.deassignProjectManager(projectManager.old);
    if (projectManager.new !== null) Student.setProjectManager(projectManager.new);
  }

  console.log(logo);
});

module.exports = router;
