const express = require('express');
const router = express.Router();
const renderPDF = require('chrome-headless-render-pdf')
// var Technology = require('../models/technology.model.js');
const TechnologySemester = require('../models/technology_semester.model.js');
const Student = require('../models/student.model.js');
const User = require('../models/user.model.js');
const Project = require('../models/project.model.js');
const ProjectTechno = require('../models/techno_project.model.js');
const RenderPDF = require('chrome-headless-render-pdf');
const multer = require('multer');
const upload = multer({
  dest: `${__dirname}/../logos`,
  fileFilter: function pngonly (req, file, callback) {
    if (file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('Invalide file'), false);
    }
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/pdf/generate', (req, res, next) => {

  res.render('pdf-generator', {
    title: 'Fiche projet',
    user: {
      name: '',
      number: '',
      room: '',
      semester: '',
      slogan: '',
      describe: '',
      technologies: [],
      members: []
    }
  })
})

router.get('/api/pdf/render', async (req, res, next) => {
  const buffer = await renderPDF.generatePdfBuffer("http://localhost:3000/api/pdf/generate")

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="ficheProjet.pdf"`)
  res.write(buffer)
  res.end()
})

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
  res.send(students);
});

router.get('/technologiesPerSemester/:semesterId', async function (req, res, next) {
  const technoSem = await TechnologySemester.getAssignedTechno(req.params.semesterId);
  res.send(technoSem);
});

router.get('/:semesterId/:projectId/studentsNotOnProject', async function (req, res, next) {
  const students = await Student.getStudentBySemesterIdNotOnProject(req.params.semesterId, req.params.projectId);
  res.send(students);
});

router.get('/:projectId/pdf', async function (req, res, next) {
  const students = await Student.getByProject(req.params.projectId);
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
    image: project[0].image,
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
    res.status(401).send({ error: 'Identifiants invalides.' });
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

router.put('/modifiedProject', upload.single('logo'), async function (req, res, next) {
  console.log(req.file);
  const project = {};
  const student = [];
  let projectManager = {};
  let techno = [];
  if (req.body.projectId) project.id = req.body.projectId;
  if (req.body.name) project.name = req.body.name;
  if (req.body.slogan) project.slogan = req.body.slogan;
  if (req.body.describe) project.describe = req.body.describe;
  if (req.file) project.image = req.file.filename;
  if (req.body.technologies) techno = JSON.parse(req.body.technologies);
  if (req.body.membersId) student.push(...JSON.parse(req.body.membersId));
  if (req.body.projectManager) projectManager = JSON.parse(req.body.projectManager);
  project.validate = req.session.userType === 'student' ? 'waiting' : 'yes';

  if (Object.keys(project).length !== 1) {
    const validCollumn = ['id', 'name', 'describe', 'slogan', 'image', 'validate'];
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
    Student.deassignProjectManager(projectManager.old);
    if (projectManager.new !== null) Student.setProjectManager(projectManager.new);
  }
  console.log('panda');
});

router.post('/createPDF', async function (req, res, next) {
  project = Project.getById(req.body.id)
  console.log(`${__dirname}/../pdf/${project.name}.pdf`)
  RenderPDF.default.generateSinglePdf(`http://localhost:8080/student/createPDF/${req.body.id}`, `${__dirname}/../pdf/${project.name}.pdf`, {chromeBinary: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'});
  res.send
})

module.exports = router;
