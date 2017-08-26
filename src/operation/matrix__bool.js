const F = require('mathjs').fraction
const List = require('immutable').List
const mn = require('./matrix__number.js')
/**
 * checks if a matrix is a square matrix.
 * @param {List} m: is a matrix representation
 * @return {Boolean} whether m is a square matrix
 */
const isSquare = (matrix) => (
  mn.rows(matrix) === mn.columns(matrix))

/**
 * chekc if a matrix is an identity matrix
 * @param {List} m: is a matrix representation
 * @return {Boolean} whether m is a
 */
const isIdentity = (matrix) => (
  isSquare(matrix) &&
  isIdentityGivenisSquare(matrix))

const isIdentityGivenisSquare = (matrix) => (
  matrix.every((vector, row) => (
    vector.every((element, column) => (
      row !== column && element.equals(F(0)) ||
      row === column && element.equals(F(1)))))))

/**
 * checks if two matrices are the same size
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (
  mn.rows(m1) === mn.rows(m2) &&
  mn.columns(m1) === mn.columns(m2))

module.exports = {
  isSquare, isIdentity, sameSize}
