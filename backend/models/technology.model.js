// const PostgressStore = require('../utils/PostgressStore');
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
class Technology {
  static toSqlTable () {
    return [`
			CREATE TABLE ${Technology.tableName} (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) UNIQUE NOT NULL
			)`];
  }
}

/** @type {String} */
Technology.tableName = 'technology';

module.exports = Technology;
