const R = require('ramda')
const mn = require('./matrix__number.js')
/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 * @param  {matrix} m: a matrix representation
 * @return {bool} whether the Matrix represents a rectangular array of objects
 */
const verify = (m) => (isArrayOfArrays(m) && isRectangular(m) && widthGeZero(m))
const isArrayOfArrays = (m) => (isArray(m) && R.all(isArray)(m))
const isArray = (m) => (m instanceof Array)
const isRectangular = (m) => {
  const sameLengthAsFirst = (l) => (l.length === m[0].length)
  return R.all(sameLengthAsFirst)(m)
}
const widthGeZero = (m) => (R.all(elementWidthGeZero)(m))
const elementWidthGeZero = (l) => (l.length > 0)


/**
 * checks if a matrix is a square matrix.
 * @param {matrix} m: is a matrix representation
 * @return {bool} whether m is a square matrix
 */
const isSquare = (m) => (m.length == m[0].length)


/**
 * chekc if a matrix is an identity matrix
 * @param {matrix} m: is a matrix representation
 * @return {bool} whether m is a
 */
const isIdentity = (m) => (isSquare(m) && allRowOfIdentity(m))
const allRowOfIdentity = (m, i=0) => {
  if(i >= m.length) {
    return true
  } else {
    return isRowOfIdentity(m[i], i) && allRowOfIdentity(m, i+1)
  }
}
const isRowOfIdentity = (l, rowNumber=0, i=0) => {
  if (i >= l.length) {
    return true;
  } else if (i == rowNumber) {
    return l[i] == 1 && isRowOfIdentity(l, rowNumber, i+1)
  } else {
    return l[i] == 0 && isRowOfIdentity(l, rowNumber, i+1)
  }
}


/**
 * checks if two matrices are the same size
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return {bool} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (m1.length == m2.length && m1[0].length == m2[0].length)


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
const rowValid = (m, n) => (n >= 0 && n <= m.length-1)


/**
 * checks if a row is a valid column index of a matrix
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the column index
 * @return {bool} whether n is a valid column index of m
 */
const columnValid = (m, n) => (n >= 0 && n <= m[0].length-1)

module.exports = {verify,
                  isSquare,
                  isIdentity,
                  isRowOfIdentity,
                  addDefined,
                  subDefined,
                  mulDefined,
                  rowValid,
                  columnValid}
