const PostgressStore = require('../utils/PostgressStore');
class Jury {
  static toSqlTable () {
    return [`
      CREATE TYPE project_type_list AS ENUM('IL', 'SR', 'none')`,
        `CREATE TABLE ${Jury.tableName} (
        id SERIAL PRIMARY KEY,
        project_type project_type_list NOT NULL,
        vip BOOL NOT NULL
    )`];
  }

  static async empty () {
    PostgressStore.client.query(
      `DELETE FROM ${this.tableName}`
    );
  }
}

/** @type {String} */
Jury.tableName = 'jury';

module.exports = Jury;
