const List = require('immutable').List
const isVector = require('./isVector.js')
const sameSize = require('../vb').sameSize

/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 * @param {List} m: a matrix representation
 * @return {Boolean} whether the Matrix represents a rectangular array of
 *   objects
 */
const isMatrix = (m) => (
  List.isList(m) &&
  m.every((element) => (
    isVector(element))) &&
  m.every((element) => (
    sameSize(element, m.get(0))
  )))

module.exports = isMatrix
