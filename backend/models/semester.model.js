const PostgressStore = require('../utils/PostgressStore');
class Semester {
  static toSqlTable () {
    const Teacher = require('./teacher.model.js');
    return [`
      CREATE TYPE semester_list AS ENUM('S1', 'S2', 'S3IL', 'S3SR', 'S4IL', 'S4SR', 'S5IL', 'S5SR')`,
      `CREATE TABLE ${Semester.tableName} (
          id SERIAL PRIMARY KEY,
          name semester_list UNIQUE NOT NULL,
          referent_id INT REFERENCES ${Teacher.tableName}
      )`];
  }

  static async getAllNamesIds () {
    const result = await PostgressStore.client.query(
      `SELECT id, name 
        FROM ${Semester.tableName}
        ORDER BY name`
    );
    return result.rows;
  }

  static async getSemesterByTeacher (teacherId) {
    const result = await PostgressStore.client.query({
      text: `SELECT id, name
              FROM ${Semester.tableName}
              WHERE referent_id = $1
              ORDER BY id`,
      values: [teacherId]
    });
    return result.rows;
  }
}

/** @type {String} */
Semester.tableName = 'semester';

module.exports = Semester;
