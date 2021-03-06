const PostgressStore = require('../utils/PostgressStore');
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

  static async init () {
    await PostgressStore.client.query(
      `INSERT INTO ${this.tableName}
        (firstname, lastname, invite, expiration, user_id)
        VALUES 
        ('Thomas', 'Kerbrat','zogzog', '2021-01-01', 1),
        ('Antoine', 'Raquillet','zogog', '2021-01-01', 2)`
    );
  }

  static async getName (teacherId) {
    const User = require('./user.model.js');
    const result = await PostgressStore.client.query({
      text: `
        SELECT firstname, lastname
        FROM ${Teacher.tableName}
        JOIN ${User.tableName}
        ON id = user_id
        WHERE id = $1`,
        values: [teacherId]
    });
    return result.rows[0];
  }
}

/** @type {String} */
Teacher.tableName = 'teacher';

module.exports = Teacher;
