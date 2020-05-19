const PostgressStore = require('../utils/PostgressStore.js');
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
    const result = await PostgressStore.client.query(
      `SELECT *
        FROM ${Technology.tableName}
        ORDER BY name`
    );
    return result.rows;
  }

  static async createTechno (name) {
    const response = await PostgressStore.client.query({
      text: `INSERT INTO technology(
        name)
        VALUES ($1)
        RETURNING id`,
      values: [name]
    });
    return response.rows;
  }
}

/** @type {String} */
Technology.tableName = 'technology';

module.exports = Technology;
