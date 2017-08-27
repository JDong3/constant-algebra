const F = require('mathjs').fraction
const isVector = require('./isVector.js')
const vb = require('../vector__bool.js')

const addDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2) &&
      vb.sameSize(v1, v2))

const subDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2) &&
      vb.sameSize(v1, v2))

const scaleDefined = (v, n) => (
  isVector(v) &&
    (n instanceof F))

module.exports = {
  addDefined, subDefined, scaleDefined
}
