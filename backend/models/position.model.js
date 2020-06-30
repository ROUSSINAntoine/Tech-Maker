const PostgressStore = require('../utils/PostgressStore');
class Position {
  static toSqlTable () {
    const Room = require('./room.model.js');
    return [`
      CREATE TABLE ${Position.tableName} (
        id SERIAL PRIMARY KEY,
        room_id INT REFERENCES ${Room.tableName}
    )`
    ];
  }

  static async empty () {
    PostgressStore.client.query(
      `DELETE FROM ${this.tableName}`
    );
  }

  static async nbPerRoom (roomId) {
    const Room = require('./room.model.js');

    const resp = await PostgressStore.client.query({
      text: `
        SELECT COUNT(p.id) AS nb, r.max_project
        FROM ${Position.tableName} AS p
        RIGHT JOIN ${Room.tableName} AS r
        ON r.id = p.room_id
        WHERE r.id = $1
        GROUP BY r.id;`,
      values: [roomId]
    });
    return resp.rows[0];
  }

  static async deleteById (positionId) {
    const Project = require('./project.model.js');

    await PostgressStore.client.query({
      text: `DELETE FROM ${Position.tableName} WHERE id = $1;`,
      values: [positionId]
    });
  }

  static async add (roomId) {
    const resp = await PostgressStore.client.query({
      text: `
        INSERT INTO ${Position.tableName} (room_id)
        VALUES ($1)
        RETURNING *;`,
        values: [roomId]
    });
    return resp.rows[0];
  }
}

/** @type {String} */
Position.tableName = 'position';

module.exports = Position;
