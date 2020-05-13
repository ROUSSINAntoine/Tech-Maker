const SERVER_URL = 'http://localhost:3000';

/**
 * Get Student CSV.
 * @param {string} Content of the csv
 */
export function AddStudentCSV (csv) {
  fetch(`${SERVER_URL}/StudentCSV`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(csv)
  });
}