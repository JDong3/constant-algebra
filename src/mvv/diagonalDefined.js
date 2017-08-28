const isMatrix = require('../is').isMatrix


const diagonalDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

module.exports = diagonalDefined
