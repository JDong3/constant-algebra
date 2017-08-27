const isVector = (v) => (
  v.isList() &&
    v.size > 0)

module.exports = isVector
