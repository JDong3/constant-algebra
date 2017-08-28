const List = require('immutable').List
const dot = require('../vn').dot
const column = require('../mv').column

/**
 * perfoms multiplication for one matrix on another matrix
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @param {Number} i: is the index
 * @param {List} res: is the result matrix
 * @return the result of m1 * m2
 */
const mul = (m1, m2, i=0, res=List()) => {
  if (i >= m1.size) {
    return res
  } else {
    const update = res.push(subMul(m1.get(i), m2))
    return mul(m1, m2, i+1, update)
  }
}
const subMul = (v, m, i=0, res=List()) => {
  if (i >= m.get(0).size) {
    return res
  } else {
    const update = res.push(dot(v, column(m, i)))
    return subMul(v, m, i+1, update)
  }
}

module.exports = mul
