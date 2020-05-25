const PostgressStore = require('./PostgressStore.js');
const Users = require('../models/user.model.js');
const Teacher = require('../models/teacher.model.js');
const Semester = require('../models/semester.model.js');
const pgtools = require('pgtools');

const config = require('../server.config.js');

(async function () {
  const conf = {
    user: config.postgres.user,
    host: config.postgres.host,
    password: config.postgres.password
  };

  try {
    await pgtools.dropdb(conf, config.postgres.database);
  } catch (error) {
    console.log('error but is ok', error);
  }

  await pgtools.createdb(conf, config.postgres.database);
  await PostgressStore.init();
  await PostgressStore.buildTables();
  await Users.init();
  await Teacher.init();
  await Semester.init();
  console.log('Is ok');
})();
