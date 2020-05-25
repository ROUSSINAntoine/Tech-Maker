const postgressStore = require('../utils/PostgressStore.js');

class Users {
  static toSqlTable () {
    return [`
      CREATE TYPE type_list AS ENUM('admin', 'teacher', 'student')`,
      `CREATE TABLE ${Users.tableName} (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        type type_list NOT NULL
      )
    `];
  }

  static async init () {
    await postgressStore.client.query(
      `INSERT INTO users
        (id, password, email, type)
        VALUES 
        (1, 'toto', 'teacher@teacher.com', 'teacher'),
        (2, 'titi', 'teacher2@teacher.com', 'teacher')`
    );
  }

  /**
   *
   * @param {Array<String>} emails
   */

  static async createStudentUser (emails) {
    let inputs = '';

    for (let i = 0; i < emails.length; i++) {
      if (emails[i].match(/^[a-z-']{1,14}@(intechinfo\.fr)$/g)) {
        inputs += `('toto', '${emails[i]}', 'student')`;
      } else {
        throw new Error(`Invalid email : ${emails[i]}`);
      }

      if (i !== emails.length - 1) inputs += ',';
    }
    // console.log(inputs);
    await postgressStore.client.query(
      `INSERT INTO users
        (password, email, type)
        VALUES ${inputs}`
    );
  }

  static async getUserByEmail (email) {
    const response = await postgressStore.client.query({
      text: `SELECT id FROM ${Users.tableName}
        WHERE email LIKE $1`,
      values: [email]
    });

    return response.rows;
  }
}

/** @type {String} */
Users.tableName = 'users';

module.exports = Users;
