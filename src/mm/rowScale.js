const scale = require('../vv').scale

const rowScale = (m, r, n=1) => (
  m.set(r, scale(m.get(r), n)))

module.exports = rowScale
