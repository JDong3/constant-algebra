/**
 * A collection of functions that GAURANTEE a property of a matrix
 */

const R = require('ramda')
const List = require('immutable').List
const mn = require('./matrix__number.js')
const isMatrix = require('./verification/isMatrix.js')
/**
 * checks if a matrix is a square matrix.
 * @param {List} m: is a matrix representation
 * @return {Boolean} whether m is a square matrix
 */
const isSquare = (m) => (
  m.size == m.get(0).size)

/**
 * chekc if a matrix is an identity matrix
 * @param {List} m: is a matrix representation
 * @return {Boolean} whether m is a
 */
const isIdentity = (m) => (
  isSquare(m) &&
    allRowOfIdentity(m))

const allRowOfIdentity = (m, i=0) => {
  if(i >= m.size) {
    return true
  } else {
    return isRowOfIdentity(m.get(i), i) &&
      allRowOfIdentity(m, i+1)
  }
}

const isRowOfIdentity = (v, rowNumber=0, i=0) => {
  if (i >= v.size) {
    return true;
  } else if (i == rowNumber) {
    return v.get(i) == 1 &&
      isRowOfIdentity(v, rowNumber, i+1)
  } else {
    return v.get(i) == 0 &&
      isRowOfIdentity(v, rowNumber, i+1)
  }
}

/**
 * checks if two matrices are the same size
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (
  m1.size == m2.size &&
    m1.get(0).size == m2.get(0).size)





module.exports = {
  isSquare, isIdentity, sameSize}
