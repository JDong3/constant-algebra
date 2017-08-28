const isMatrix = require('../is').isMatrix

/**
 * checks if a row is a valid row index of a matrix
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the row index
 * @return {Boolean} whether n is a valid row index of m
 */
const rowDefined = (m, n) => (
  isMatrix(m) &&
    n >= 0 &&
      n <= m.size-1)

module.exports = rowDefined
