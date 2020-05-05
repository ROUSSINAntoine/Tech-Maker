const PostgressStore = require('../utils/PostgresStore');

class Project {
  static toSqlTable () {
    const Position = require('./position.model.js');
    return [`
      CREATE TYPE validate_list AS ENUM('yes', 'no', 'waiting')`,
        `CREATE TABLE ${Project.tableName} (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          describe TEXT,
          slogan TEXT,
          image TEXT UNIQUE,
          identifier INT UNIQUE,
          validate validate_list,
          bankable BOOL NOT NULL,
          needs TEXT,
          position_id INT REFERENCES ${Position.tableName} 
    )`,
      `ALTER TABLE ${Project.tableName} ADD UNIQUE(position_id)`
    ];
  }

  static async getAll () {
    const result = await PostgressStore.client.query(
      `SELECT * FROM ${Project.tableName}`
    );
    return result.rows;
  }
}

/** @type {String} */
Project.tableName = 'project';

module.exports = Project;
