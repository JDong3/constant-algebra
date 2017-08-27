/**
 * generates a colum vector.
 * @param  {matrix} m: is a matrix representation
 * @param  {number} n: is index of the column you want to get, 0<=n< l[0].length
 * @return {vector} a vector representation of the nth column of n
 */
const column = (m, n) => (
  m.map((v) => (
    v.get(n))))

module.exports = column
