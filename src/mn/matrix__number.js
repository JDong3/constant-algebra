const F = require('mathjs').fraction
const vn = require('./vector__number.js')
const mv = require('./matrix__vector.js')

const rows = (matrix) => (
  matrix.size)

const columns = (matrix) => (
  matrix.get(0).size)

const trace = (matrix) => (
  mv.diagonal(matrix).reduce((a, b) => (
    a.add(b))))

const mulTrace = (matirx) => (
  mv.diagonal(matrix).reduce((a, b) => (
    a.mul(b))))

const antiTrace = (matrix) => (
  mv.antiDiagonal(matrix).reduce((a, b) => (
    a.add(b))))

const mulAntiTrace = (m) => (
  mv.antiDiagonal(matrix).reduce((a, b) => (
    a.mul(b))))

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

const cofactor = (m, c, r) => (
  F(-1).pow(c+r).mul(det(minor(m, c, r))))

const minor = (m, r, c) => (
  m.delete(r)
   .map((v) => (
     v.delete(c))))

module.exports = {
  rows, columns, trace, mulTrace, antiTrace, mulAntiTrace, det, cofactor
}
