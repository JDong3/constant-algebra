module.exports = {transpose, add, sub, mul}

const m_v = require('./matrix__vector.js')
const v_n = require('./matrix__number.js')
const R = require('ramda');
/**
 * gets the column vectors of m as a new matrix object
 * @param  {[type]} l             [description]
 * @param  {Number} [n=0]         [description]
 * @param  {[type]} [ret=Array()] [description]
 * @return {[type]}               [description]
 */
let transpose = (m, n=0, res=[]) => {
  if (n > m.length) {
    return res
  } else {
    ret.push(m_v.gzetColumn(m, n))
    return transpose(m, n+1, res)
  }
}

let add = (m1, m2, i=0, res=[]) => {
  if (i > m1.length) {
    return res
  } else {
    res.push(addVectors(m1[i], m2[i])
    return add(m1, m2, i+1, res)
  }
}

let addVectors = (v1, v2, i=0, res=[]) {
  if (i > v1.length) {
    return res;
  } else {
    ret.push(v1[i] + v2[i])
    return addVectors(v1, v2, i+1, res))
  }
}

let sub = (m) => {
  if (i > m1.length) {
    return res
  } else {
    res.push(subVectors(m1[i], m2[i])
    return add(m1, m2, i+1, res)
  }
}

let subVectors = (v1, v2, i=0, res=[]) {
  if (i > v1.length) {
    return res;
  } else {
    ret.push(v1[i] - v2[i])
    return addVectors(v1, v2, i+1, res))
  }
}

let mul = (m1, m2, i=0, res=[]) = {
  if (i > m1.length) {
    return res;
  } else {
    res.push(subMul(m1[i], m2)
    return mul(m1, m2, i+1, res)
  }
}

let subMul = (v, m, i=0, res=[]) {
  if (i > v.length) {
    return res
  } else {
    res.push(v_n.dot(v, m[i])
    return subMul(v, m, i+1, res)
  }
}
