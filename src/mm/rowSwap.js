/**
 * performs elementary row swap on rows indexed r1 and r2
 * @param {List} m: is a matrix representation
 * @param {Number} r1: is the index of the first row
 * @param {Number} r2: is the index of the second row
 * @return {List}
 */
const rowSwap = (m, r1, r2) => {
  const step1 = m.set(r1, m.get(r2))
  const step2 = step1.set(r2, m.get(r1))
  return step2
}
module.exports = rowSwap
