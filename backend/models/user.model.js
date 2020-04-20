// const PostgressStore = require('../utils/PostgressStore');

class Users {
  static toSqlTable () {
    return `
      CREATE TABLE ${Users.tableName} (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        admin BOOL NOT NULL
      )
    `;
  }
}

/** @type {String} */
Users.tableName = 'users';

module.exports = Users;
