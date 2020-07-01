const PostgressStore = require('../utils/PostgressStore');

/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
class Room {
  static toSqlTable () {
    return `
			CREATE TABLE ${Room.tableName} (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) UNIQUE NOT NULL,
				max_student INT NOT NULL,
				max_project INT NOT NULL,
				max_student_per_project INT NOT NULL,
				color VARCHAR(7) UNIQUE NOT NULL,
				usable BOOL NOT NULL
			)
		`;
  }

  static async getAllRooms () {
    const result = await PostgressStore.client.query(
			`SELECT * FROM ${Room.tableName} ORDER BY name`
    );
    return result.rows;
  }

  static async init () {
    const result = await PostgressStore.client.query(
			`INSERT INTO ${this.tableName}
				(name, max_student, max_project, max_student_per_project, color, usable)
				VALUES ('E01', 0, 0, 0, '#000001', false), ('E02', 0, 0, 0, '#000002', false), ('E03', 0, 0, 0, '#000003', false);`
    );
    return result.rows;
  }

  static async newRoom (name, max_student, max_project, max_student_per_project, color) {
    const result = await PostgressStore.client.query({
			text: `INSERT INTO ${this.tableName}
				(name, max_student, max_project, max_student_per_project, color, usable)
        VALUES ($1, $2, $3, $4, $5, false);`,
      values: [name, max_student, max_project, max_student_per_project, color]
    });
    return result.rows;
  }

  static async update (params, values) {
    await PostgressStore.client.query({
      text: `
				UPDATE ${Room.tableName}
				SET ${params}
				WHERE id = $1`,
      values: [...values]
    });
  }

  static async deleteById (roomId) {
    await PostgressStore.client.query({
      text: `DELETE FROM ${Room.tableName} WHERE id = $1`,
      values: [roomId]
    });
  }
}

/** @type {String} */
Room.tableName = 'room';

module.exports = Room;
