const PostgressStore = require('../utils/PostgressStore');
class StudentJudge {
  static toSqlTable () {
    const Judge = require('./judge.model.js');
    const Student = require('./student.model.js');
    return `
    CREATE TABLE ${StudentJudge.tableName} (
      student_id INT REFERENCES ${Student.tableName},
        judge_id INT REFERENCES ${Judge.tableName},
        PRIMARY KEY(student_id, judge_id)
    )`;
  }

  static async empty () {
    PostgressStore.client.query(
      `DELETE FROM ${this.tableName}`
    );
  }
}

/** @type {String} */
StudentJudge.tableName = 'student_judge';

module.exports = StudentJudge;
