const User = require('./user.model.js');
const Teacher = require('./teacher.model.js');
const Semester = require('./semester.model.js');
const Room = require('./room.model.js');
const Position = require('./position.model.js');
const Project = require('./project.model.js');
const Student = require('./student.model.js');
const Jury = require('./jury.model.js');
const JuryProject = require('./jury_project.model.js');
const Judge = require('./judge.model.js');
const StudentJudge = require('./student_judge.model.js');
const Technology = require('./technology.model.js');
const TechnoProject = require('./techno_project.model.js');
const TechnologySemester = require('./technology_semester.model.js');

module.exports = [
  User,
  Teacher,
  Semester,
  Room,
  Position,
  Project,
  Student,
  Jury,
  JuryProject,
  Judge,
  StudentJudge,
  Technology,
  TechnoProject,
  TechnologySemester
];
