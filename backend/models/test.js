let test = [10, '28', -1, '0', 'trois'];
test = test.map(i => parseInt(i));
console.log(test);
function isSafeNumber (nbrs) {
  return Number.isInteger(nbrs) && nbrs > 0;
}

test.forEach(element => {
  console.log(isSafeNumber(element));
});
