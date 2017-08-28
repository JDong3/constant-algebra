const F = require('mathjs').fraction
const minor = require('../mm').minor

const det = (m) => {
  if (m.size === 1) {
    return m.get(0).get(0)
  } else {
    return sumRowCofactors(m, 0)
  }
}

const sumRowCofactors = (m, r, i=0, res=F(0)) => {
  if (i >= m.get(r).size) {
    return res
  } else {
    return sumRowCofactors(
      m.get(r), i+1, res.add(cofactor(m, r, i)))
  }
}



module.exports = det
