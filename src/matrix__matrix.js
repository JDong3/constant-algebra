const mv = require('./matrix__vector.js')
const vv = require('./vector__vector.js')
const vn = require('./vector__number.js')
const R = require('ramda');
/**
 * gets the column vectors of m as a new matrix object
 * @param  {[type]} l             [description]
 * @param  {Number} [n=0]         [description]
 * @param  {[type]} [ret=Array()] [description]
 * @return {[type]}               [description]
 */
const transpose = (m, n=0, res=[]) => {
  if (n > m.length) {
    return res
  } else {
    ret.push(mv.gzetColumn(m, n))
    return transpose(m, n+1, res)
  }
}

const add = (m1, m2, i=0, res=[]) => {
  if (i > m1.length) {
    return res
  } else {
    res.push(vv.add(m1[i], m2[i]))
    return add(m1, m2, i+1, res)
  }
}

const sub = (m) => {
  if (i > m1.length) {
    return res
  } else {
    res.push(vv.sub(m1[i], m2[i]))
    return sub(m1, m2, i+1, res)
  }
}

const mul = (m1, m2, i=0, res=[]) => {
  if (i > m1.length) {
    return res;
  } else {
    res.push(subMul(m1[i], m2))
    return mul(m1, m2, i+1, res)
  }
}

const subMul = (v, m, i=0, res=[]) => {
  if (i > v.length) {
    return res
  } else {
    res.push(vn.dot(v, m[i]))
    return subMul(v, m, i+1, res)
  }
}

module.exports = {transpose, add, sub, mul}
