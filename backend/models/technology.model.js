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
        FROM ${Technology.tableName}`
    );
    return result.rows;
  }

  static async getTechnoPerSemester (semesterId) {
    const result = await PostgressStore.client.query({
      TEXT: `
              SELECT t.id AS id,
                t.name AS name
              FROM ${Technology.tableName} AS t
              JOIN Technology_Semester AS ts
              ON t.id = ts.technology_id
              JOIN Semester AS s
              ON ts.semester_id = s.id
              WHERE s.id = $1
              ORDER BY t.name`,
      VALUES: [semesterId]
    });
    return result.rows;
  }
}

/** @type {String} */
Technology.tableName = 'technology';

module.exports = Technology;
