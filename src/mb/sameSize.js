const F = require('mathjs').fraction
const List = require('immutable').List
const rows = require('../mn').columns
const columns = require('../mn').columns
/**
 * checks if two matrices are the same size
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether m1 and m2 are the same size
 */
const sameSize = (m1, m2) => (
  rows(m1) === rows(m2) &&
  columns(m1) === columns(m2))

module.exports = sameSize
