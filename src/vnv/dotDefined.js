const isVector = require('../is').isVector
const sameSize = require('../vn').sameSize

const dotDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2) &&
      sameSize(v1, v2))


module.exports = {
  dotDefined
}
