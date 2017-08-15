const math = require("mathjs")
const R = require("ramda")

/**
 * generates a row vector.
 *
 * @param {matrix} m: is a matrix representation
 * @param {number} n: is thie index of the column you want to get,
 *   0<=n<m.length
 * @return {vector} a vector representation of the nth row of m
 */
const row = (m, n) => (m[n])

/**
 * generates a colum vector.
 *
 * @param  {matrix} m: is a matrix representation
 * @param  {number} n: is index of the column you want to get,
 *   0<=n< l[0].length
 * @return {vector} a vector representation of the nth column of n
 */
const column = (m, n) => {
  const nthElement = (m) => (m[n])
  const result = R.map(nthElement, m)
  return result
}

/**
 * gemnerates a diageonal vector.
 *
 * @param {matrix} m: is a matrix representation
 * @param {number} i:
 * @param {vector} res:
 * @return {vector} the vector representation of the diagonal of m
 */
const diagonal = (m, i = 0, res=[]) => {
  if (i >= m.length) {
    return res
  } else {
    res.push(m[i][i])
    return diagonal(m, i+1, res)
  }
}

/**
 * generates a loose diagonal vector.
 *
 * @param {matrix} m: is a 'verified' array of arrays of numbers
 * @param {number} i:
 * @param {vector} res:
 * @return {matrix} the vector representation of the loose diagonal of m
 */
const looseDiagonal = (m, i=0, res=[]) => {
  if (i >= math.min(m.length, m[0].length)) {
    return res
  } else {
    res.push(m[i][i])
    return looseDiagonal(m, i+1, res)
  }
}

module.exports = {column,
                  row,
                  diagonal,
                  looseDiagonal
                  }