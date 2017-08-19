const mv = require('./matrix__vector.js')
const vv = require('./vector__vector.js')
const vn = require('./vector__number.js')
const R = require('ramda');

/**
 * finds the transpose of a matrix.
 * @param {matirx} m: is a matrix representation
 * @param {number} i: is the index
 * @param {matrix} res: is the result matrix
 * @return a matrix that is the transpose of m
 */
const transpose = (m, i=0, res=[]) => {
  if (i >= m.length) {
    return res
  } else {
    ret.push(mv.gzetColumn(m, i))
    return transpose(m, i+1, res)
  }
}


/**
 * perfoms addition for one matrix on another matrix
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @param {number} i: is the index
 * @param {matrix} res: is the result matrix
 * @return the result of m1 + m2
 */
const add = (m1, m2, i=0, res=[]) => {
  if (i >= m1.length) {
    return res
  } else {
    res.push(vv.add(m1[i], m2[i]))
    return add(m1, m2, i+1, res)
  }
}


/**
 * perfomS subtraction for one matrix on another matrix
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @param {number} i: is the index
 * @param {matrix} res: is the result matrix
 * @return the result of m1 - m2
 */
const sub = (m1, m2, i=0, res=[]) => {
  if (i >= m1.length) {
    return res
  } else {
    res.push(vv.sub(m1[i], m2[i]))
    return sub(m1, m2, i+1, res)
  }
}


/**
 * perfoms multiplication for one matrix on another matrix
 * @param {matrix} m1: is a matrix representation
 * @param {matrix} m2: is a matrix representation
 * @param {number} i: is the index
 * @param {matrix} res: is the result matrix
 * @return the result of m1 * m2
 */
const mul = (m1, m2, i=0, res=[]) => {
  if (i >= m1.length) {
    return res;
  } else {
    res.push(subMul(m1[i], m2))
    return mul(m1, m2, i+1, res)
  }
}
const subMul = (v, m, i=0, res=[]) => {
  if (i >= v.length) {
    return res
  } else {
    res.push(vn.dot(v, m[i]))
    return subMul(v, m, i+1, res)
  }
}


/**
 * performs elementary row swap operation two rows of a matrix
 * @param {matrix} m: is a matrix representation
 * @param {number} r1: is the index of row1
 * @param {number} r2: is the index of row2
 * @param {number} i: ist eh index
 * @param {matrix} res: is the result matrix
 * @return {matrix} the result of an elementary row swap on rows r2 and r2 on m
 */
const rowSwap = (m, r1, r2, i=0, res=[]) => {
  // TODO deep copy
  if (i >= m.length) {
    return res
  } else if (i === r1) {
    const copy = m[r2].copy()
    res.push(copy)
    return rowSwap(m, r1, r2, i+1, res)
  } else if (i == r2) {
    const copy = m[r1].copy()
    res.push(copy)
    return rowSwap(m, r1, r2, i+1, res)
  } else {
    const copy = m[i].copy()
    res.push(copy)
    return rowSwap(m, r1, r2, i+1, res)
  }
}


/**
 * performs elementary row addition of a row on another row of a matrix
 * @param {matrix} m: is a matrix representation
 * @param {number} r1: is the index of the row with addition to be performed on
 * @param {number} r2: is the row that r1 will add
 * @param {number} n: is the number of times that r1 will add r2
 * @param {number} i: is the index
 * @return {matrix} the result of the row addition
 */
const rowAdd = (m, r1, r2, n=1, i=0, res=[]) => {
  // TODO deep copy m
  if (i >= m.length) {
    return res
  } else if (i === r1) {
    const copy = vv.scale(m[r2].copy(), n)
    res.push(copy)
    return rowAdd(m, r1, r2, n, i+1, res)
  } else {
    const copy = m[r2].copy()
    res.push(copy)
    return rowAdd(m, r1, r2, n, i+1, res)
  }
}

const rowScale = (m, r, n=1, i=0, res=[]) => {
  // TODO deep copy m
  const copy = m.deepCopy()
  copy[r] = vv.scale(m[r])
  return copy
}
const rref = () => {}
const minor = () => {}
const cofactors = () => {}
const adjugate = () => {}
const inverse = () => {}
module.exports = {transpose, add, sub, mul}
