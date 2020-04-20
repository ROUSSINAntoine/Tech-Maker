// const PostgressStore = require('../utils/PostgressStore');
class Position {
  static toSqlTable () {
    const Room = require('./room.model.js');
    return [`
            CREATE TABLE ${Position.tableName} (
							id SERIAL PRIMARY KEY,
							room_id INT REFERENCES ${Room.tableName}
            )`,
            `ALTER TABLE ${Position.tableName} ADD UNIQUE (room_id)`
    ];
  }
}

/** @type {String} */
Position.tableName = 'position';

module.exports = Position;
