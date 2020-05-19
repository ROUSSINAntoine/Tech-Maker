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
    console.log('getAll');
    const result = await PostgressStore.client.query(
			`SELECT * FROM ${Student.tableName}`
    );
    return result.rows;
  }

  static async createStudents (csv) {
    let inputs = '';
    for (let i = 0; i < csv.length; i++) {
      if (/* csv[i][7].match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]*$/gi) !== null && csv[i][8].match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]*$/gi) !== null */ true) {
        inputs += `('${csv[i][8]}', '${csv[i][7]}', false, ${csv[i][10][0].id}, ${csv[i][6]}, null)`;
      } else {
        console.log(csv[i][7].match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]*$/gi), ' ', csv[i][8].match(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ-\s]*$/gi));
        // throw new Error(`First or lastname : ${csv[i][7]}  ${csv[i][8]}`);
      }
      if (i !== csv.length - 1) inputs += ',';
    }
    console.log(inputs);
    await PostgressStore.client.query(
      `INSERT INTO student(
        firstname, lastname, project_manager, user_id, semester_id, project_id)
        VALUES ${inputs}`
    );
  }
}

/** @type {String} */
Student.tableName = 'student';

module.exports = Student;
