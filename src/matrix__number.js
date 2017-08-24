const vn = require('./vector__number.js')
const mv = require('./matrix__vector.js')

const rows = (m) => (m.length)
const columns = (m) => (m[0].length)
const trace = (m) => (vn.sumAll(mv.diagonal(m)))
const mul_trace = (m) => (vn.mulAll(mv.diagonal(m)))
const antiTrace = (m) => (vn.sumAll(mv.antiDiagonal(m)))
const nulAntiTrace = (m) => (vn.mulAll(mv.antiDiagonal(m)))
const det = (m) => {
  if (m.size === 1) {
    return m.get(0).get(0)
  } else {
    return sumRowCofactors(m.get(0))
  }
}
const sumRowCofactors = (v, i=0, res=F(0)) => {
  if (i >= v.size) {
    return res
  } else {
    const cofac = F(-1).exp(i)
                       .mul(det(mm.minor(m, i, 0)))
    return sumROwCofactors(v, i+1, res.add(cofac))
  }
}
const cofactor = (m, c, r) => (F(-1).exp(c+r)
                                    .mul(det(mm.minor(m, c, r))))

module.exports = {rows, columns}
