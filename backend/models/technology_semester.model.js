// const PostgressStore = require('../utils/PostgressStore');
class TechnologySemester {
  static toSqlTable () {
    const Semester = require('./semester.model.js');
    const Technology = require('./technology.model.js');
    return [`
        CREATE TABLE ${TechnologySemester.tableName} (
            id SERIAL PRIMARY KEY,
            semester_id INT REFERENCES ${Semester.tableName},
            technology_id INT REFERENCES ${Technology.tableName}
        )`,
        `ALTER TABLE ${TechnologySemester.tableName} ADD UNIQUE(semester_id, technology_id) `
    ];
  }
}

/** @type {String} */
TechnologySemester.tableName = 'technology_semester';

module.exports = TechnologySemester;
