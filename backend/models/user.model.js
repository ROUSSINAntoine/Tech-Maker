// const PostgresStore = require('../utils/PostgressStore');

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
}

/** @type {String} */
Users.tableName = 'users';

module.exports = Users;
