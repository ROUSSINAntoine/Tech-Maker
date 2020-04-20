// const PostgressStore = require('../utils/PostgressStore');
class JuryProject {
  static toSqlTable () {
    const Jury = require('./jury.model.js');
    const Project = require('./project.model.js');
    return [`
			CREATE TABLE ${JuryProject.tableName} (
				id SERIAL PRIMARY KEY,
				jury_id INT REFERENCES ${Jury.tableName},
				project_id INT REFERENCES ${Project.tableName},
				passage INT NOT NULL
			)`,
		`ALTER TABLE ${JuryProject.tableName} ADD UNIQUE(jury_id, project_id) `
    ];
  }
}

/** @type {String} */
JuryProject.tableName = 'jury_project';

module.exports = JuryProject;
