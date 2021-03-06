const PostgressStore = require('../utils/PostgressStore');
class JuryProject {
  static toSqlTable () {
    const Jury = require('./jury.model.js');
    const Project = require('./project.model.js');
    return `
      CREATE TABLE ${JuryProject.tableName} (
        jury_id INT REFERENCES ${Jury.tableName},
        project_id INT REFERENCES ${Project.tableName},
        passage INT NOT NULL,
        PRIMARY KEY(jury_id, project_id)
    )`;
  }

  static async empty () {
    PostgressStore.client.query(
      `DELETE FROM ${this.tableName}`
    );
  }
}

/** @type {String} */
JuryProject.tableName = 'jury_project';

module.exports = JuryProject;
