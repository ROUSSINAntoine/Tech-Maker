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

  static async deasign (projectId, technoId) {
    console.log('techno', technoId);
    console.log('project', projectId);
    await PostgressStore.client.query({
      text: `DELETE FROM ${TechnoProject.tableName}
              WHERE technology_id = $1 
              AND project_id = $2`,
      values: [technoId, projectId]
    });
  }

  static async add (projectId, technoId) {
    await PostgressStore.client.query({
      text: `INSERT INTO ${TechnoProject.tableName}(
        project_id, technology_id)
        VALUES ($1, $2)`,
      values: [projectId, technoId]
    });
  }

  static async getByProjectId (projectId) {
    const response = await PostgressStore.client.query({
      text: `SELECT technology_id
              FROM ${TechnoProject.tableName}
              WHERE project_id = $1`,
      values: [projectId]
    });

    return response.rows;
  }
}

/** @type {String} */
TechnoProject.tableName = 'techno_project';

module.exports = TechnoProject;
