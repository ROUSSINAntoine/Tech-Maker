const PostgresStore = require('../utils/PostgresStore');
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
class Technology {
  static toSqlTable () {
    return [`
			CREATE TABLE ${Technology.tableName} (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) UNIQUE NOT NULL
			)`];
  }

  static async getAll () {
    const result = await PostgresStore.client.query(
      `SELECT *
        FROM ${Technology.tableName}`
    );
    return result.rows;
  }
}

/** @type {String} */
Technology.tableName = 'technology';

module.exports = Technology;
