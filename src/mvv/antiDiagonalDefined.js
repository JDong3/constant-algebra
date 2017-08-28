const isMatrix = require('../is').isMatrix

const antiDiagonalDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

module.exports = antiDiagonalDefined
