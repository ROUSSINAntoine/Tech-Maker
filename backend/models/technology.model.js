// const PostgressStore = require('../utils/PostgressStore');
class Technology {
  static toSqlTable () {
    const Jury = require('./jury.model.js');
    return [`
			CREATE TABLE ${Technology.tableName} (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) UNIQUE NOT NULL
			)
		`];
  }
}

/** @type {String} */
Technology.tableName = 'technology';

module.exports = Technology;
