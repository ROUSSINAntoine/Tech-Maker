/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

const PostgressStore = require('../utils/PostgressStore');
class Student {
  static toSqlTable () {
    const User = require('./user.model');
    const Semester = require('./semester.model.js');
    const Project = require('./project.model.js');
    return `
			CREATE TABLE ${Student.tableName} (
				firstname VARCHAR(255) NOT NULL,
				lastname VARCHAR(255) NOT NULL,
				project_manager BOOL NOT NULL,
				user_id INT REFERENCES ${User.tableName},
				semester_id INT REFERENCES ${Semester.tableName},
				project_id INT REFERENCES ${Project.tableName},
				PRIMARY KEY(user_id)
			)`;
  }

  static async getAll () {
    const result = await PostgressStore.client.query(
      `SELECT * 
        FROM ${Student.tableName}
        `
    );
    return result.rows;
  }

  static async getAllStudentNameId () {
    const result = await PostgressStore.client.query(
      `SELECT CONCAT(lastname,' ', firstname) AS name, user_id AS id 
        FROM ${Student.tableName}
        WHERE project_id = null
        ORDER BY name`
    );
    return result.rows;
  }

  static async getStudentBySemesterId (semesteId) {
    const result = await PostgressStore.client.query({
      text: `SELECT CONCAT(lastname,' ', firstname) AS name, user_id AS id
        FROM ${Student.tableName}
        WHERE semester_id = $1
        AND project_id IS NULL
        ORDER BY name`,
      values: [semesteId]
    });
    return result.rows;
  }

  static async addProject (projectId, studentId) {
    console.log('addProject');
    await PostgressStore.client.query({
      text: `UPDATE ${Student.name}
      SET project_id = $1
      WHERE user_id = $2`,
      values: [projectId, studentId]
    });
  }

  static async setProjectManager (studentId) {
    console.log('setProjectManager');
    const result = await PostgressStore.client.query({
      text: `UPDATE ${Student.name}
      SET project_manager = true
      WHERE user_id = $1`,
      values: [studentId]
    });
    return result.rows;
  }

  static async createStudents (csv) {
    let inputs = '';
    for (let i = 0; i < csv.length; i++) {
      inputs += `('${csv[i][8]}', '${csv[i][7]}', false, ${csv[i][10][0].id}, ${csv[i][6]}, null)`;

      if (i !== csv.length - 1) inputs += ',';
    }
    // console.log(inputs);
    await PostgressStore.client.query(
      `INSERT INTO student(
        firstname, lastname, project_manager, user_id, semester_id, project_id)
        VALUES ${inputs}`
    );
  }

  static async getName (stdentId) {
    const User = require('./user.model.js');
    const result = await PostgressStore.client.query({
      text: `
        SELECT firstname, lastname
        FROM ${Student.tableName}
        JOIN ${User.tableName}
        ON id = user_id
        WHERE id = $1`,
        values: [studentId]
    });
    return result.rows[0];
  }
}

/** @type {String} */
Student.tableName = 'student';

module.exports = Student;
