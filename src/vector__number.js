const F = require('mathjs').fraction
const List = require('immutable').List

const dot = (v1, v2, i=0, res=F(0)) => {
  if(i >= v1.size) {
    return res
  } else {
    return dot(v1, v2, i+1, res.add((v1.get(i).mul(v2.get(i)))))
  }
}

/**
 * finds the sum of all elements in a vector.
 * @param  {vector} v: is a vector representation
 * @return {number} the sum of all elements in v
 */
const sumEach = (v) => (v.reduce((a, b) => (a.add(b)), F(0)))

const altSumEach = (v, i=0, res=F(0)) => {
  if (i >= v.size) {
    return res
  } else if (i%2 === 0) {
    return altSumEach(v, i+1, res.add(v.get(i)))
  } else {
    return altSumEach(v, i+1, res.sub(v.get(i)))
  }
}

/**
 * find the product of all elements in a vector.
 * @param {vector} v: a vector representation
 * @return {number} the sum of all elements in v
 */
const mulEach = (v) => (v.reduce((a, b) => (a.mul(b)), F(1)))

module.exports = {dot, sumEach, altSumEach, mulEach}
