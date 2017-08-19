const vn = require('./vector__number.js')
const mv = require('./matrix__vector.js')

const rows = (m) => (m.length)
const columns = (m) => (m[0].length)

const pivot = () => {}
const trace = (m) => (vn.sumAll(mv.diagonal(m)))
const mul_trace = (m) => (vn.mulAll(mv.diagonal(m)))
const antiTrace = (m) => (vn.sumAll(mv.antiDiagonal(m)))
const nulAntiTrace = (m) => (vn.mulAll(mv.antiDiagonal(m)))
const det = () => {}
const cofactor = () => {}

module.exports = {rows, columns}
