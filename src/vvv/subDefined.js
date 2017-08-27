const subDefined = (v1, v2) => (
  isVector(v1) &&
    isVector(v2) &&
      vb.sameSize(v1, v2))

module.exports = subDefined
