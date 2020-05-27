var express = require('express');
var router = express.Router();
var TechnologySemester = require('../models/technology_semester.model.js');
var Student = require('../models/student.model.js');
var Teacher = require('../models/teacher.model.js');
var User = require('../models/user.model.js');

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

router.post('/login', async (req, res) => {
  const user = await User.getUserByEmailPassword(req.body.email, req.body.password);

  if (!user) {
    res.send({ error: 'Idenfifiants invalides.'}).status(401);
  } else {
    req.session.userId = user.id;
    const resp = { route: user.type };
    if (user.type !== 'admin') {
      const data = user.type === 'teacher'
        ? await Teacher.getName(user.id)
        : await Student.getName(user.id);
      resp.name = `${data.firstname} ${data.lastname}`.replace(/\s/g, '-');
    }
    res.send(resp);
  }
});

module.exports = router;
