const dotDefined = (v1, v2) => {
  return v1.length === v2.length
}

const sameSize = (v1, v2) => (v1.length === v2.length)

module.exports = {dotDefined, sameSize}
