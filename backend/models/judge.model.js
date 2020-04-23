
class Judge {
  static toSqlTable () {
    const Jury = require('./jury.model.js');
    return [`
			CREATE TABLE ${Judge.tableName} (
				id SERIAL PRIMARY KEY,
				firstname VARCHAR(255) UNIQUE NOT NULL,
				lastname VARCHAR(255) UNIQUE NOT NULL,
				enterprise VARCHAR(255),
				jury_id INT REFERENCES ${Jury.tableName}
			)`,
			`ALTER TABLE ${Judge.tableName} ADD UNIQUE(jury_id)`
    ];
  }
}

/** @type {String} */
Judge.tableName = 'judge';

module.exports = Judge;
