// const SERVER_URL = 'https://localhost:8080';
const fetch = require('node-fetch');
const SERVER_URL = 'http://localhost:3000';

/**
 * Get list of technologies per teacher's semesters.
 * @returns {Promise<{
 *  semester: Array.<{ id: Number, name: String, ckeckedIds: Array.<Number> }>,
 *  technologies: Array.<{ id: Number, name: String }
 * }>}
 */
export function getTechnologiesPerTeacher () {
  return fetch(`${SERVER_URL}/teacher/techno`, {
    credentials: 'include'
  })
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
  return fetch(`${SERVER_URL}/admin/techno`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

export function reset () {
  return fetch(`${SERVER_URL}/admin/reset`, {
    method: 'delete'
  });
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
    credentials: 'include',
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
    credentials: 'include',
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
    method: 'delete',
    credentials: 'include'
  });
}

/**
 * Get all projects for the teacher.
 * @returns {Promise<Array.<{
 *  id: Number,
 *  name: String,
 *  projects: Array.<{ id: Number, name?: String, logo: String, status: string }
 * }>>}
 */
export function getProjectsPerTeacher () {
  return fetch(`${SERVER_URL}/teacher/projects`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

export function getAllProjects () {
  return fetch(`${SERVER_URL}/admin/projects`, {
    credentials: 'include'
  })
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
    credentials: 'include',
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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, membersId, projectManager })
  })
    .then(resp => resp.json())
    .then(data => data);
}

export function createRoom (name, max_student, max_project, max_student_per_project, color) {
  return fetch(`${SERVER_URL}/admin/createRoom`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, max_student, max_project, max_student_per_project, color})
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
  return fetch(`${SERVER_URL}/technologiesPerSemester/${semesterId}`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all students of the semester.
 * @param {Number} semesterId Id of the semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getStudentsByProject (projectId) {
  return fetch(`${SERVER_URL}/${projectId}/pdf`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get students of the semester if they aren't in a project.
 * @param {Number} semesterId Id of the semester
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getStudentsPerSemesterNotOnProject (semesterId, projectId) {
  return fetch(`${SERVER_URL}/${semesterId}/${projectId}/studentsNotOnProject`, {
    credentials: 'include'
  })
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
  return fetch(`${SERVER_URL}/${projectId}/project`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

export function getStudentsPerSemester (semesterId) {
  return fetch(`${SERVER_URL}/${semesterId}/Students`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get student data.
 * @returns {Promise<{ name: String, projectId: (Number | null) }>}
 */
export function getStudentData () {
  return fetch(`${SERVER_URL}/student`, {
    credentials: 'include'
  })
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
 *  projectManager?: Number
 * }} modifiedData
 */
export function setModifiedprojectData (modifiedData) {
  console.log(modifiedData);

  fetch(`${SERVER_URL}/modifiedProject`, {
    method: 'put',
    credentials: 'include',
    body: modifiedData
  });
}

export function createPDF (projectId) {
  fetch(`${SERVER_URL}/createPDF`, {
    method: 'post',
    body: projectId
  });
}

/**
 * Get all semesters for the teacher.
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getSemestersPerTeacher () {
  return fetch(`${SERVER_URL}/teacher/semesters`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get all semesters name and id.
 * @returns {Promise<Array.<{ id: Number, name: String }>>}
 */
export function getAllSemestersName () {
  return fetch(`${SERVER_URL}/admin/semestersName`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Get Student CSV.
 * @param {string} Content of the csv
 * @returns {Promise<{response: string}>}
 */
export function AddStudentCSV (csv, userType) {
  return fetch(`${SERVER_URL}/admin/${userType}`, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(csv)
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send login identifier and get if connected.
 * @param {String} email
 * @param {String} password
 * @returns {Promise<{ error: string } | { route: 'admin' | 'teacher' | 'student' }>}
 */
export function postLogin (email, password) {
  return fetch(`${SERVER_URL}/login`, {
    method: 'post',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Verify if user is connected with a session.
 * @returns {Promise<{ connected: Boolean, userType?: 'admin' | 'teacher' | 'student' }>}
 */
export function isConnected () {
  return fetch(`${SERVER_URL}/connected`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Close user session.
 */
export function logout () {
  fetch(`${SERVER_URL}/logout`, {
    method: 'post',
    credentials: 'include'
  });
}

/**
 * @returns {Promise<Array.<{
 *  id: number,
 *  name: string,
 *  students: number,
 *  projects: number,
 *  studentPerProject: number,
 *  color: string,
 *  usable: boolean
 * }>>}
 */
export function getRooms () {
  return fetch(`${SERVER_URL}/admin/rooms`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send modified data from the rooms.
 * @param {Array.<{
 *  id: number,
 *  name? string,
 *  student?: string,
 *  projects?: number,
 *  studentPerProject?: number,
 * color?: string,
 * usable?: boolean
 * }>} data Modified data.
 * @returns {Promise<{ message: string, error: boolean }>} Response for the operation.
 */
export function updateRoomsData (data) {
  return fetch(`${SERVER_URL}/admin/rooms/update`, {
    method: 'put',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * @returns {Promise<{
 *  projects: Array.<{ id: number, name: string, nbStudents: number, roomId: number }>,
 * }>}
 */
export function getProjectShortData () {
  return fetch(`${SERVER_URL}/admin/projectShortData`, {
    credentials: 'include'
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Send new rooms for the projects.
 * @param {Array.<{ id: number, roomId: number }>} projects List of changed rooms for the projects
 * @returns {Promise<{ error: boolean, message: string }>}
 */
export function updateProjectsRoom (projects) {
  return fetch(`${SERVER_URL}/admin/updateProjectsRoom`, {
    method: 'put',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projects)
  })
    .then(resp => resp.json())
    .then(data => data);
}

/**
 * Delete room and set null in project_id for all projects in this room.
 * @param {number} roomId Id of the room
 */
export function deleteRoomById(roomId) {
  fetch(`${SERVER_URL}/admin/deleteRoom/${roomId}`, {
    method: 'delete',
    credentials: 'include'
  });
}
