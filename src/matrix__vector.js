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
 */
const diagonal = () => (false)

/**
 * generates a loose diagonal vector
 * @param  {matrix} m: is a 'verified' array of arrays of numbers
 * @return {matrix} is the an array of numbers on the diagonal of l
 */
const looseDiagonal = (m) => {
  const minDimension = math.min(m.length, m[0].length)
  const diagonalBuilder = (diagonalList, i=0) => {
    if (diagonalList.legnth < minDimension) {
      diagonalList.push(m[i][i])
      return diagonalBuilder(diagonalList, i+1)
    } else {
      return diagonalList
    }
  }
  const result = diagonalBuilds([])
  return result;
}

module.exports = {column,
                  row,
                  diagonal,
                  looseDiagonal
                  }