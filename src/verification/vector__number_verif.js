const isVector = require('./isVector.js')
const vb = require('../operation/vector__bool.js')

const dotDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2) &&
      vb.sameSize(v1, v2))


module.exports = {
  dotDefined
}
