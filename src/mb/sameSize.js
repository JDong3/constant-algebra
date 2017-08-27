const F = require('mathjs').fraction
const List = require('immutable').List
const mn = require('./matrix__number.js')
/**
 * checks if two matrices are the same size
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (
  mn.rows(m1) === mn.rows(m2) &&
  mn.columns(m1) === mn.columns(m2))

module.exports = sameSize
