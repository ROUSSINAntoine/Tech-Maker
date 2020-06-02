const PostgressStore = require('../utils/PostgressStore.js');

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

  static async createProject (projectName) {
    console.log('createProject');
    const id = await PostgressStore.client.query({
      text: `INSERT INTO project(
        name, describe, slogan, image, identifier, validate, bankable, needs, position_id)
        VALUES ($1, null, null, null, null, 'no', false, null, null)
        RETURNING id;`,
      values: [projectName]
    });
    return id.rows;
  }

  static async update (inputValues, updateValues) {
    console.log(inputValues);
    await PostgressStore.client.query({
      text: `UPDATE project
      SET ${updateValues}
      WHERE id = $1;`,
      values: [...inputValues]
    });
  }

  static async getAll () {
    const result = await PostgressStore.client.query(
      `SELECT * FROM ${Project.tableName}`
    );
    return result.rows;
  }

  static async getByName (name) {
    const result = await PostgressStore.client.query({
      text: `SELECT name FROM ${Project.tableName} WHERE name LIKE $1`,
      values: [name]
    });
    return result.rows.length;
  }

  static async getById (id) {
    // console.log('getbyid', id);
    const result = await PostgressStore.client.query({
      text: `SELECT name, slogan, describe, needs 
              FROM ${Project.tableName} 
              WHERE id = $1`,
      values: [id]
    });
    return result.rows;
  }

  static async getBySemester (semesterId) {
    const result = await PostgressStore.client.query({
      text: `SELECT DISTINCT P.id, P.name, P.image AS logo, validate as status
              FROM ${Project.tableName} P
              JOIN student S
              ON P.id = S.project_id
              WHERE S.semester_id = $1
              ORDER BY P.name`,
      values: [semesterId]
    });
    return result.rows;
  }

  static async empty () {
    PostgressStore.client.query(
      `DELETE FROM ${this.tableName}`
    );
  }

  /**
   * @param {number} projectId
   * @param {'yes' |'waiting' | 'no'} validate
   */
  static setValidate (projectId, validate) {
    PostgressStore.client.query({
      text: `
        UPDATE ${Project.tableName}
        SET validate = $1
        WHERE id = $2;`,
      values: [validate, projectId]
    });
  }
}

/** @type {String} */
Project.tableName = 'project';

module.exports = Project;
