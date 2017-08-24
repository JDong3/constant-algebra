const vn = require('./vector__number.js')
const mv = require('./matrix__vector.js')

const rows = (m) => (m.length)
const columns = (m) => (m[0].length)
const trace = (m) => (vn.sumAll(mv.diagonal(m)))
const mulTrace = (m) => (vn.mulAll(mv.diagonal(m)))
const antiTrace = (m) => (vn.sumAll(mv.antiDiagonal(m)))
const mulAntiTrace = (m) => (vn.mulAll(mv.antiDiagonal(m)))
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
    const cofac = F(-1).exp(i)
                       .mul(det(mm.minor(m, i, 0)))
    return sumROwCofactors(m.get(r), i+1, res.add(cofac))
  }
}
const cofactor = (m, c, r) => (F(-1).exp(c+r)
                                    .mul(det(mm.minor(m, c, r))))
module.exports = {rows,
                  columns,
                  trace,
                  mulTrace,
                  antiTrace,
                  mulAntiTrace,
                  det,
                  cofactor}
