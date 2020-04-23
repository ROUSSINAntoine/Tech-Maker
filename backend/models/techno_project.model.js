// const PostgressStore = require('../utils/PostgressStore');
class TechnoProject {
  static toSqlTable () {
    const Project = require('./project.model.js');
    const Technology = require('./technology.model.js');
    return `
        CREATE TABLE ${TechnoProject.tableName} (
            project_id INT REFERENCES ${Project.tableName},
            technology_id INT REFERENCES ${Technology.tableName},
            PRIMARY KEY(project_id, technology_id)
        )`;
  }
}

/** @type {String} */
TechnoProject.tableName = 'techno_project';

module.exports = TechnoProject;
