// const PostgresStore = require('../utils/PostgressStore');
class TechnologySemester {
  static toSqlTable () {
    const Semester = require('./semester.model.js');
    const Technology = require('./technology.model.js');
    return `
        CREATE TABLE ${TechnologySemester.tableName} (
            semester_id INT REFERENCES ${Semester.tableName},
            technology_id INT REFERENCES ${Technology.tableName},
            PRIMARY KEY(semester_id, technology_id)
        )`;
  }
}

/** @type {String} */
TechnologySemester.tableName = 'technology_semester';

module.exports = TechnologySemester;
