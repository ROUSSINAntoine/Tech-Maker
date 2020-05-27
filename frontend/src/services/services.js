// const SERVER_URL = 'https://localhost:8080';
const fetch = require('node-fetch');
const SERVER_URL = 'http://localhost:3000';

/**
 * Get list of technologies per teacher's semesters.
 * @param {Number} teacherId Teacher's Id
 * @returns {Promise<{
 *  semester: Array.<{ id: Number, name: String, ckeckedIds: Array.<Number> }>,
 *  technologies: Array.<{ id: Number, name: String }
 * }>}
 */
export function getTechnologiesPerTeacher (teacherId) {
  return fetch(`${SERVER_URL}/teacher/${teacherId}/techno`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get list if technologies per semester for all semesters.
 * @returns {Promise<{
 *  semester: { id: Number, name: String, ckeckedIds: Array.<Number> },
 *  technologies: Array.<{ id: Number, name: String }
 * }>}
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
  fetch(`${SERVER_URL}/admin/techno/${id}/rename`, {
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
  fetch(`${SERVER_URL}/admin/techno/${id}/del`, {
    method: 'delete'
  });
}

/**
 * Get all projects for the teacher.
 * @param {Number} id Teacher's id
 * @returns {Promise<Array.<{
 *  id: Number,
 *  name: String,
 *  projects: Array.<{ id: Number, name: String, logo: String }
 * }>>}
 */
export function getProjectsPerTeacher (id) {
  return fetch(`${SERVER_URL}/teacher/${id}/projects`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send technology's name and get id.
 * @param {String} name Technology's name
 * @returns {Promise<{ id: Number, name: String, error?: String }>}
 */
export function createTechnology (name) {
  return fetch(`${SERVER_URL}/admin/createTechno`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send project's name and semester, and get id.
 * @param {String} name Project's name
 * @param {Array.<Number>} membersId Ids of project member
 * @param {Number} projectManager Id of project manager
 * @returns {Promise<{ id: Number, name: String, error?: String }>}
 */
export function createProject (name, membersId, projectManager) {
  return fetch(`${SERVER_URL}/teacher/createProject`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, membersId, projectManager })
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all technologies of the semester.
 * @param {Number} semesterId Id of semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getTechnologiesPerSemester (semesterId) {
  return fetch(`${SERVER_URL}/technologiesPerSemester/${semesterId}`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all students of the semester.
 * @param {Number} semesterId Id of the semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getStudentsPerSemester (semesterId) {
  return fetch(`${SERVER_URL}/${semesterId}/students`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get students of the semester if they aren't in a project.
 * @param {Number} semesterId Id of the semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getStudentsPerSemesterNotOnProject (semesterId, projectId) {
  return fetch(`${SERVER_URL}/${semesterId}/${projectId}/studentsNotOnProject`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get data from the project.
 * @param {Number} projectId Id of the project
 * @returns {Promise<{
 *  id: Number,
 *  name: String,
 *  slogan: String,
 *  describe: String,
 *  technologies: Array.<Number>,
 *  membersId: Array.<Number>,
 *  needs: String,
 *  semesterId: Number,
 *  projectManager: Number
 * }>}
 */
export function getProjectData (projectId) {
  return fetch(`${SERVER_URL}/${projectId}/project`)
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
 * @param {{
 *  projectId: Number,
 *  name?: String,
 *  slogan?: String,
 *  describe?: String,
 *  logo?: String,
 *  technologies?: Array.<{ id: Number, add: Boolean }>,
 *  members?: Array.<{ id: Number, add: Boolean }>,
 *  semesterId?: Number,
 * projectManager?: Number
 * }} modifiedData
 */
export function setModifiedprojectData (modifiedData) {
  fetch(`${SERVER_URL}/modifiedProject`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modifiedData)
  });
}

/**
 * Get all semesters for the teacher.
 * @param {Number} teacherId Id of teacher
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getSemestersPerTeacher (teacherId) {
  return fetch(`${SERVER_URL}/teacher/${teacherId}/semesters`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all semesters name and id.
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getAllSemestersName () {
  return fetch(`${SERVER_URL}/admin/semestersName`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get Student CSV.
 * @param {string} Content of the csv
 */
export function AddStudentCSV (csv) {
  fetch(`${SERVER_URL}/admin/StudentCSV`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(csv)
  });
}
