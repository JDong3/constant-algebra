const isMatrix = require('./isMatrix.js')

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


/**
 * checks if a row is a valid column index of a matrix
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the column index
 * @return {Boolean} whether n is a valid column index of m
 */
const columnDefined = (m, n) => (
  isMatrix(m) &&
    n >= 0 &&
      n <= m.get(0).size-1)

const diagonalDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

const looseDiagonalDefined = (m) => (
  isMatrix(m))

const antiDiagonalDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))
const looseAntiDiagonalDefined = (m) => (
  isMatrix(m))

module.exports = {
  rowDefined, columnDefined, diagonalDefined, looseAntiDiagonalDefined,
  antiDiagonalDefined, looseAntiDiagonalDefined
}
