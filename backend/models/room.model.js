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

	static async update (params, values) {
		await PostgressStore.client.query({
			text: `
				UPDATE ${Room.tableName}
				SET ${params}
				WHERE id = $1`,
			values: [ ...values ]
		});
	}
}

/** @type {String} */
Room.tableName = 'room';

module.exports = Room;
