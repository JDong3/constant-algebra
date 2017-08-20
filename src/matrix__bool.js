const R = require('ramda')
const List = require('immutable').List
const mn = require('./matrix__number.js')
/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 * @param  {matrix} m: a matrix representation
 * @return {bool} whether the Matrix represents a rectangular array of objects
 */
const verify = (m) => (isListOfLists(m) && isRectangular(m) && widthOfFirstGeZero(m))
const isListOfLists = (m) => (List.isList(m) && m.every(v => List.isList(v)))
const isRectangular = (m) => {
  const sameSizeAsFirst = (v) => (v.size === m.get(0).size)
  return m.every(sameSizeAsFirst)
}
const widthOfFirstGeZero = (m) => (m.get(0).size > 0)

/**
 * checks if a matrix is a square matrix.
 * @param {matrix} m: is a matrix representation
 * @return {bool} whether m is a square matrix
 */
const isSquare = (m) => (m.size == m.get(0).size)


/**
 * chekc if a matrix is an identity matrix
 * @param {matrix} m: is a matrix representation
 * @return {bool} whether m is a
 */
const isIdentity = (m) => (isSquare(m) && allRowOfIdentity(m))
const allRowOfIdentity = (m, i=0) => {
  if(i >= m.size) {
    return true
  } else {
    return isRowOfIdentity(m.get(i), i) && allRowOfIdentity(m, i+1)
  }
}
const isRowOfIdentity = (v, rowNumber=0, i=0) => {
  if (i >= v.size) {
    return true;
  } else if (i == rowNumber) {
    return v.get(i) == 1 && isRowOfIdentity(v, rowNumber, i+1)
  } else {
    return v.get(i) == 0 && isRowOfIdentity(v, rowNumber, i+1)
  }
}


/**
 * checks if two matrices are the same size
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return {bool} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (m1.size == m2.size && m1.get(0).size == m2.get(0).size)


/**
 * checks if addition is defined for two matrices
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return {bool} whether addition is defined for m1 and m2
 */
const addDefined = (m1, m2) => (sameSize(m1, m2))


/**
 * checks if subtraction is defined for two matrices
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return {bool} whether subtraction is defined for m1 by m2
 */
const subDefined = (m1, m2) => (sameSize(m1, m2))


/**
 * checks if multiplication is defined for two matrices
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return {bool} whether matrix multiplication is defined for m1 my m2
 */
const mulDefined = (m1, m2) => (mn.rows(m1) === mn.columns(m2))


/**
 * checks if a row is a valid row index of a matrix
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the row index
 * @return {bool} whether n is a valid row index of m
 */
const rowValid = (m, n) => (n >= 0 && n <= m.size-1)


/**
 * checks if a row is a valid column index of a matrix
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the column index
 * @return {bool} whether n is a valid column index of m
 */
const columnValid = (m, n) => (n >= 0 && n <= m.get(0).size-1)

module.exports = {verify,
                  isSquare,
                  isIdentity,
                  isRowOfIdentity,
                  addDefined,
                  subDefined,
                  mulDefined,
                  rowValid,
                  columnValid}
