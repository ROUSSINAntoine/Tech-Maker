// const PostgressStore = require('../utils/PostgressStore');
class Student {
  static toSqlTable () {
    const User = require('./user.model');
    const Semester = require('./semester.model.js');
    const Project = require('./project.model.js');
    return [`
			CREATE TABLE ${Student.tableName} (
				firstname VARCHAR(255) NOT NULL,
				lastname VARCHAR(255) NOT NULL,
				project_manager BOOL NOT NULL,
				user_id INT PRIMARY KEY REFERENCES ${User.tableName},
				semester_id INT REFERENCES ${Semester.tableName},
				project_id INT REFERENCES ${Project.tableName}
			)`,
	`ALTER TABLE ${Student.tableName} ADD UNIQUE (user_id, semester_id, project_id)`
    ];
  }
}

/** @type {String} */
Student.tableName = 'student';

module.exports = Student;
