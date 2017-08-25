const isVector = require('./isVector.js')

const dotDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2))

const sumEachDefined = (v) => (
  isVector(v))

const mulEachDefined = (v) => (
  isVector(v))

module.exports = {
  dotDefined, sumEachDefined, mulEachDefined
}
