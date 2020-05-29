var express = require('express');
var router = express.Router();
var Technology = require('../models/technology.model.js');
var TechnologySemester = require('../models/technology_semester.model.js');
var Semester = require('../models/semester.model.js');
var Student = require('../models/student.model.js');
var Project = require('../models/project.model.js');

router.get('/techno', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.session.userId);

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

router.post('/createProject', async function (req, res, next) {
  if (await Project.getByName(req.body.name) === 0) {
    const projectId = await Project.createProject(req.body.name);
    for (let i = 0; i < req.body.membersId.length; i++) {
      await Student.addProject(projectId[0].id, req.body.membersId[i]);
    }
    if (req.body.projectManager !== null) await Student.setProjectManager(req.body.projectManager);
    const response = {
      name: req.body.name,
      id: projectId[0].id
    };
    res.send(response);
  } else {
    res
      .status('403')
      .send({ error: 'Already exist' });
  }
});

router.get('/semesters', async function (req, res, next) {
  const semesters = await Semester.getSemesterByTeacher(req.session.userId);
  res.send(semesters);
});

router.get('/projects', async function (req, res, next) {
  const response = [];
  const semesters = await Semester.getSemesterByTeacher(req.session.userId);

  for (let i = 0; i < semesters.length; i++) {
    // TODO: changer les noms des ids
    response.push({
      id: semesters[i].id,
      name: semesters[i].name,
      projects: await Project.getBySemester(semesters[i].id)
    });
  }
  res.send(response);
});

router.get('/test', async function (req, res, next) {
  const semesters = await Technology.getAll();
  res.send(semesters);
});

module.exports = router;
