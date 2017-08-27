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

module.exports = isSquare
