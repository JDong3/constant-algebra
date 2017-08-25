const List = require('immutable').List

/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 * @param {List} m: a matrix representation
 * @return {Boolean} whether the Matrix represents a rectangular array of
 *   objects
 */
const isMatrix = (m) => (
  isListOfLists(m) &&
    isRectangular(m) &&
      widthOfFirstGeZero(m))

const isListOfLists = (m) => (
  List.isList(m) &&
    m.every((v) => (
      List.isList(v))))

const isRectangular = (m) => (
  m.every((v) => (
    v.size === m.get(0).size)))

const widthOfFirstGeZero = (m) => (
  m.get(0).size > 0)

const isVector = (v) => {}

module.exports = isMatrix
