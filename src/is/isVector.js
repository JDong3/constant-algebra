const F = require('mathjs').fraction
const List = require('immutable').List

const isVector = (v) => (
  List.isList(v) &&
  v.size > 0 &&
  v.every(isFraction))

// this is a hack, using it because inheritance is not set up properly for the fraction
// object???
const isFraction = (element) => (
  element.n !== undefined &&
  element.d !== undefined &&
  element.s !== undefined)

module.exports = isVector
