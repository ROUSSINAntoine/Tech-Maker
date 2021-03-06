const pg = require('pg');
const config = require('../server.config.js');

// console.log(config);
// console.log(myfile)

class PostgressStore {
  async init () {
    this.pool = new pg.Pool(config.postgres);
    this.client = await this.pool.connect();
  }

  close () {
    // @ts-ignore
    if (this.client) this.client.release();
    this.client = null;
  }

  async buildTables () {
    const models = require('../models/model_by_name.js');
    for (const model of models) {
      const q = model.toSqlTable();
      if (Array.isArray(q)) {
        for (const query of q) {
          console.log(query);
          await this.pool.query(query);
        }
      } else {
        console.log(q);
        await this.client.query(q);
      }
    }
  }
}

module.exports = new PostgressStore();
