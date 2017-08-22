const List = require('immutable').List

const dot = (v1, v2, i=0, res=0) => {
  if(i >= v1.size) {
    return res
  } else {
    return dot(v1, v2, i+1, res+(v1.get(i)*v2.get(i)))
  }
}

/**
 * finds the sum of all elements in a vector.
 * @param  {vector} v: is a vector representation
 * @return {number} the sum of all elements in v
 */
const sumEach = (v) => (v.reduce((a, b) => (a+b), 0))

/**
 * find the product of all elements in a vector.
 * @param {vector} v: a vector representation
 * @return {number} the sum of all elements in v
 */
const mulEach = (v) => (v.reduce((a, b) => (a*b), 1))

module.exports = {dot, sumEach, mulEach}
