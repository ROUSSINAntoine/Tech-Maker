// const PostgressStore = require('../utils/PostgressStore');
class StudentJudge {
  static toSqlTable () {
    const Judge = require('./judge.model.js');
    const Student = require('./student.model.js');
    return [`
			CREATE TABLE ${StudentJudge.tableName} (
				id SERIAL PRIMARY KEY,
				student_id INT REFERENCES ${Student.tableName},
				judge_id INT REFERENCES ${Judge.tableName}
			)`,
			`ALTER TABLE ${StudentJudge.tableName} ADD UNIQUE(student_id, judge_id)`
    ];
  }
}

/** @type {String} */
StudentJudge.tableName = 'student_judge';

module.exports = StudentJudge;
