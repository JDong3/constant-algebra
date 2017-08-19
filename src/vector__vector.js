const R = require('ramda')
const math = require('mathjs')

const add = (v1, v2, i=0, res=[]) => {
  if (i > v1.length) {
    return res;
  } else {
    res.push(v1[i] + v2[i])
    return add(v1, v2, i+1, res)
  }
}

const sub = (v1, v2, i=0, res=[]) => {
  if (i > v1.length) {
    return res;
  } else {
    res.push(v1[i] - v2[i])
    return sub(v1, v2, i+1, res)
  }
}

const scale = (v, n) => {
  const scaleByN = (x) => (x*n)
  return R.map(scaleByN, v)
}

/**
 * finds the sum of all elements in a vector.
 * @param  {vector} v: is a vector representation
 * @return {number} the sum of all elements in v
 */
const sumEach = (v) => (R.reduce(math.add, 0, v))

/**
 * find the product of all elements in a vector.
 * @param {vector} v: a vector representation
 * @return {number} the sum of all elements in v
 */
const mulEach = (v) => (R.reduce(math.multiply, 1, v))

module.exports = {add,
                  sub,
                  scale,
                  sumEach,
                  mulEach
                 }
