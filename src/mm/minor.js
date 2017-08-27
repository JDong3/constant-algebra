const minor = (m, r, c) => (
  m.delete(r)
   .map(v => v.delete(c)))

module.exports = minor
