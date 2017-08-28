const minor = (m, r, c) => (
  m.delete(r).map((
    v) => {
     console.log('minor: ', m, v)
     return v.delete(c)})
   )

module.exports = minor
