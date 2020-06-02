const express = require('express');
const router = express.Router();
// var Technology = require('../models/technology.model.js');
// // var Teacher = require('../models/teacher.model.js');
// var TechnologySemester = require('../models/technology_semester.model.js');
// var Semester = require('../models/semester.model.js');
// var User = require('../models/user.model.js');
const Student = require('../models/student.model.js');
// var Project = require('../models/project.model.js');
// var TechnoProject = require('../models/techno_project.model.js');

router.use(async (req, res, next) => {
  console.log(req.session.userId, req.session.userType);
  if (req.session.userId) {
    const user = await Users.getTypeById(req.session.userId);
    if (user[0] && user[0].type === 'student') {
      next();
    } else {
      res.status(403).send({ message: "Vous n'avez pas l'autorisation d'accéder à ces données."});
    }
  } else {
    res.status(403).send({ message: "Vous n'avez pas l'autorisation d'accéder à ces données."});
  }
}); 

router.get('/', async function (req, res, next) {
  const students = await Student.getStudentData(req.session.userId);
  res.send(students[0]);
});

module.exports = router;
