const F = require('mathjs').fraction
const List = require('immutable').List
const isSquare = require('./isSquare.js')

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

module.exports = isIdentity
