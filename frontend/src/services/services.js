//const SERVER_URL = 'https://localhost:8080';
const SERVER_URL = 'http://localhost:3001';

/**
 * Get list of technologies per semester.
 * @param {Number} teacherId Teacher's Id
 * @returns {Promise<Object<(semester: Object<(id: Number, name: String, ckeckedIds: Array<Number>)>, technologies: Array<Object<(id: Number, name: String)>)>>}
 */
export function getTechnologiesPerTeacher (teacherId) {
  return fetch(`${SERVER_URL}/teacher/${teacherId}/techno`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get list if technologies per semester for all semesters.
 * @returns {Promise<Object<(semester: Object<(id: Number, name: String, ckeckedIds: Array<Number>)>, technologies: Array<Object<(id: Number, name: String)>)>>}
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
 * @param {Array<Object<(semesterId: Number, technologyId: Number, add: Boolean)>>} updateTechno
 */
export function setModifiedTechnologiesPerSemester (updateTechno) {
  fetch(`${SERVER_URL}/modifiedTechnologiesPerSemester`, {
    method: 'post',
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
 * Send technology's id to be deleted. 
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
 * @returns {Array<Object<(id: Number, name: String, projects: Array<Object<(id: Number, name: String, logo: String)>>)>>}
 */
export function getProjectsPerTeacher (id) {
  return fetch(`${SERVER_URL}/teacher/${id}/projects`)
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send technology's name and get id.
 * @param {String} name Technology's name
 * @returns {Object<(id: Number, name: String)>}
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
 * @returns {Object<(id: Number, name: String)>}
 */
export function createProject (name, semesterId) {
  console.log(0);
  /*return */fetch(`${SERVER_URL}/teacher/createProject`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, semesterId: semesterId})
  });
}