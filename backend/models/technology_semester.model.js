const PostgressStore = require('../utils/PostgressStore.js');
class TechnologySemester {
  static toSqlTable () {
    const Semester = require('./semester.model.js');
    const Technology = require('./technology.model.js');
    return `
        CREATE TABLE ${TechnologySemester.tableName} (
            semester_id INT REFERENCES ${Semester.tableName},
            technology_id INT REFERENCES ${Technology.tableName},
            PRIMARY KEY(semester_id, technology_id)
        )`;
  }

  static async getAssignedTechno (semesterID) {
    // let condition = '';
    // semesterID = semesterID.map(i => parseInt(i, 10));
    // semesterID.filter(i => isSafeNumber(i));

    // for (let i = 0; i < semesterID.length; i++) {
    //   condition += `semester_id = $${i}`;
    // }

    // const result = await PostgressStore.client.query({
    //   TEXT: `SELECT *
    //           FROM ${TechnologySemester.tableName}
    //           WHERE ${condition}`,
    //   VALUES: semesterID
    // });

    const result = await PostgressStore.client.query({
      text: `SELECT technology_id
              FROM ${TechnologySemester.tableName}
              WHERE semester_id = $1`,
      values: [semesterID]
    });
    return result.rows;
  }

  static async delete (technoId) {
    await PostgressStore.client.query({
      text: `DELETE FROM ${TechnologySemester.tableName}
              WHERE technology_id = $1`,
      values: [technoId]
    });
  }

  static async add (semesterId, technoId) {
    await PostgressStore.client.query({
      text: `INSERT INTO technology_semester(
        semester_id, technology_id)
        VALUES ($1, $2)`,
      values: [semesterId, technoId]
    });
  }
}

// function isSafeNumber (nbrs) {
//   return Number.isInteger(nbrs) && nbrs > 0;
// }

/** @type {String} */
TechnologySemester.tableName = 'technology_semester';

module.exports = TechnologySemester;
