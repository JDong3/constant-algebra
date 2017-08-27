const List = require('immutable').List
const columns = require('../mn').columns
const rows = require('../mn').rows

/**
 * checks if a matrix is a square matrix.
 * @param {List} m: is a matrix representation
 * @return {Boolean} whether m is a square matrix
 */
const isSquare = (matrix) => (
  rows(matrix) === columns(matrix))

module.exports = isSquare
