const R = require("ramda")

/**
 * verifies that the object represents a rectangular array of ofjects.
 *
 * @param {obj} m: anything you want
 * @return {boolean} whether m represents a rectangular array of objects
 */
const verify = (m) => {
  return isArrayOfArrays(m) && isRectangular(m) && widthGeZero(m)
}

/**
 * [verify helper] checks if the input is an Array, with elements that are
 * also arrays.
 *
 * @param {matrix} m: is a matrix representation
 * @return {boolean} m: whether m is and Array and all elements contained by
 *   m are also Arrays
 */
const isArrayOfArrays = (m) => {
  const isArray = (m) => (m instanceof Array) 
  return isArray(m) && R.all(isArray)(m) 
}

/**
  * [verify helper] checks for rectangularity of input, each row being the same
  * length.
  *
  * @param {matrix} m: is a matrix representation
  * @return {boolean} whether each row in m is the same length as the 0th
  *   row in m
  */
const isRectangular = (m) => {
  const sameLengthAsFirst = (l) => (l.length === m[0].length)
  return R.all(sameLengthAsFirst)(m)
}

/**
 * [verify helper] checks for width of matrix w, w > 0.
 *
 * @param {matrix} m: is a matrix representation
 * @return {boolean} whether the width of m is greater than 0
 */
const widthGeZero = (m) => {
  const elementWidthGeZero = (l) => (l.length > 0)
  return R.all(elementWidthGeZero)(m)
}

/**
 * checks if a matrix is a square matrix
 *
 * @param {matrix} m: is a valid matrix representation
 * @return {boolean} whether m represents a square matrix
 */
const isSquare = (m) => (m.length == m[0].length)

/**
 * checks if a matrix is an identity matrix.
 *
 * @param {matrix} m: is a valid matrix representation
 * @return {boolean} whether m represents an identity matrix
 */
const isIdentity = (m) => {
  const identity = (m, index=0) => {
    if(index >= m.length) {
      return true
    } else {
      return isRowOfIdentity(m[index], index) && identity(m, index+1)
    }
  }
  return isSquare(m) && identity(m)
}

/**
 * [isIdentity helper] checks whether a vector v is row rowNumber of an
 * identity matrix
 *
 * @param {vector} v: is a vector representation
 * @param {number} rowNumber: is the row number of the identity matrix you want
 *   to match
 * @param {number} index: option to check whether v.splice(index, v.length-1)
 *   form the latter part of rowNumber(th) row of an identity matrix
 * @return {boolean} whether v represents represents row rowNumber of an
 *   identity matrix
 */
const isRowOfIdentity = (v, rowNumber=0, index=0) => {
  if (index >= v.length) {
    return true
  } else if (index == rowNumber) {
    return v[index] == 1 && isRowOfIdentity(v, rowNumber, index+1)
  } else {
    return v[index] == 0 && isRowOfIdentity(v, rowNumber, index+1)
  }
}

/**
 * checks if addition is defined for the two input matrix representations
 *
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return whether matrix addition is defined for m1 and m2
 */
const addDefined = (m1, m2) => {
  const sameSize = m1.length == m2.length && m1[0].length == m2[0].length
  return sameSize
}

/**
 * checks if subtraction is defined for the two input matrix representations
 *
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @return whether matrix subtraction is defined for m1 and m2
 */
const subDefined = (m1, m2) => (addDefined(m1, m2))

/**
 * checks if a row index is valid for a matrix.
 *
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the row index being checked
 * @return {boolean} whether n is a valid row index for matrix m
 */
const rowValid = (m, n) => (n >= 0 && n <= m.length-1)

/**
 * checks if a column index is valid for a matrix.
 *
 * @param {matirx} m: is a matrix representation
 * @param {number} n: is the column index being checked
 * @return {boolean} whether n is a valid column index for matrix m
 */
const columnValid = (m, n) => (n >= 0 && n <= m[0].length-1)

module.exports = {verify,
                  isSquare,
                  isIdentity,
                  isRowOfIdentity,
                  addDefined,
                  subDefined,
                  rowValid,
                  columnValid}