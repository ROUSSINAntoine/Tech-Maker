// const PostgresStore = require('../utils/PostgressStore');
class Teacher {
  static toSqlTable () {
    const User = require('./user.model.js');
    return [`
      CREATE TABLE ${Teacher.tableName} (
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        invite VARCHAR(255) UNIQUE,
        expiration DATE,
        user_id INT PRIMARY KEY REFERENCES ${User.tableName} NOT NULL
      )`,
    `ALTER TABLE ${Teacher.tableName} ADD UNIQUE (user_id)`
    ];
  }
}

/** @type {String} */
Teacher.tableName = 'teacher';

module.exports = Teacher;
