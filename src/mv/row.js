/**
 * generates a row vector.
 * @param {matrix} m: is a matrix representation
 * @param {number} n: is thie index of the column you want to get, 0<=n<m.length
 * @return {vector} a vector representation of the nth row of m
 */
const row = (m, n) => (
  m.get(n))

module.exports = row
