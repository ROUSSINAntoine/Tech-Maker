// const SERVER_URL = 'https://localhost:8080';
const fetch = require('node-fetch');
const SERVER_URL = 'http://localhost:3000';

/**
 * Get list of technologies per semester.
 * @param {Number} teacherId Teacher's Id
 * @returns {Promise<{ semester: { id: Number, name: String, ckeckedIds: Array.<Number> }, technologies: Array.<{ id: Number, name: String } }>}
 */
export function getTechnologiesPerTeacher (teacherId) {
  return fetch(`${SERVER_URL}/teacher/${teacherId}/techno`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get list if technologies per semester for all semesters.
 * @returns {Promise<{ semester: { id: Number, name: String, ckeckedIds: Array.<Number> }, technologies: Array.<{ id: Number, name: String } }>}
 */
export function getAllTechnologies () {
  return fetch(`${SERVER_URL}/admin/techno`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send technologies added or deleted from the semesters.
 * If add is `true`, technologie is added,
 * if add is `false` technologie is deleted.
 * @param {Array.<{ semesterId: Number, technologyId: Number, add: Boolean }>} updateTechno
 */
export function setModifiedTechnologiesPerSemester (updateTechno) {
  fetch(`${SERVER_URL}/modifiedTechnologiesPerSemester`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateTechno)
  });
}

/**
 * Send new technology's name.
 * @param {Number} id Technology's id
 * @param {String} newName New technology's name
 */
export function updateTechnologyName (id, newName) {
  fetch(`${SERVER_URL}/techno/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newName })
  });
}

/**
 * Send technology's id to be deleted
 * @param {Number} id Technology'id
 */
export function deleteTechnology (id) {
  fetch(`${SERVER_URL}/techno/${id}`, {
    method: 'delete'
  });
}

/**
 * Get all projects for the teacher.
 * @param {Number} id Teacher's id
 * @returns {Promise<Array.<{ id: Number, name: String, projects: Array.<{ id: Number, name: String, logo: String } }>>}
 */
export function getProjectsPerTeacher (id) {
  return fetch(`${SERVER_URL}/teacher/${id}/projects`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send technology's name and get id.
 * @param {String} name Technology's name
 * @returns {Promise<{ id: Number, name: String }>}
 */
export function createTechnology (name) {
  return fetch(`${SERVER_URL}/admin/createTechno`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  });
}

/**
 * Send project's name and get id.
 * @param {String} name Project's name
 * @param {Number} semesterId Id of project semester
 * @returns {{ id: Number, name: String }}
 */
export function createProject (name, semesterId) {
  console.log(0);
  /* return */fetch(`${SERVER_URL}/teacher/createProject`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, semesterId: semesterId })
  });
}

/**
 * Get all technologies of the semester.
 * @param {Number} semesterId Id of semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getTechnologiesPerSemester (semesterId) {
  return fetch(`${SERVER_URL}/technologies/${semesterId}`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all students of the semester.
 * @param {Number} semesterId Id of the semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getStudentsPerSemester (semesterId) {
  return fetch(`${SERVER_URL}/students/${semesterId}`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get data from the project.
 * @param {Number} projectId Id of the project
 * @returns {Promise<{ id: Number, name: String, slogan: String, describe: String, technologies: Array.<Number>, membersId: Array.<Number>, needs: String, semester: { id: Number, name: String } }>}
 */
export function getProjectData (projectId) {
  return fetch(`${SERVER_URL}/project/${projectId}`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get student data.
 * @param {Number} studentId Id of student
 * @returns {Promise<{ id: Number, name: String, projectId: (Number | null) }>}
 */
export function getStudentData (studentId) {
  return fetch(`${SERVER_URL}/student/${studentId}`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send technologies added or deleted from the semesters.
 * If add property is `true`, item is added,
 * if add property is `false` item is deleted.
 * @param {{ projectId: Number, name?: String, slogan?: String, describe?: String, logo?: String, technologies?: Array.<{ id: Number, add: Boolean }>, members?: Array.<{ id: Number, add: Boolean }> }} modifiedData
 */
export function setModifiedprojectData (modifiedData) {
  fetch(`${SERVER_URL}/modifiedProject`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modifiedData)
  });
}

/**
 * Get Student CSV.
 * @param {string} Content of the csv
 */
export function AddStudentCSV (csv) {
  fetch(`${SERVER_URL}/admin/StudentCSV`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.parse(csv)
  });
}
