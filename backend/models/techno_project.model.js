const PostgressStore = require('../utils/PostgressStore');
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

  static async delete (technoId) {
    await PostgressStore.client.query({
      text: `DELETE FROM ${TechnoProject.tableName}
              WHERE technology_id = $1`,
      values: [technoId]
    });
  }
}

/** @type {String} */
TechnoProject.tableName = 'techno_project';

module.exports = TechnoProject;
