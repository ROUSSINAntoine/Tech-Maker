//const SERVER_URL = 'https://localhost:8080';
const SERVER_URL = 'http://localhost:3001';

/**
 * Get list of technologies per semester.
 * @param {Number} teacherId Teacher's id
 * @returns {Promise<Object<(semester: Object<(id: Number, name: String, ckeckedIds: Array<Number>)>, technologies: Array<Object<(id: Number, name: String)>)>>}
 */
export function getTechnologiesPerSemester (teacherId) {
  return fetch(`${SERVER_URL}/teacher/${teacherId}/technologies`)
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
