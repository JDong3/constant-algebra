const R = require("ramda")

const dot = (v1, v2, i=0, res=0) => {
  if(i >= v1.length) {
    return res
  } else {
    return dot(v1, v2, i+1, res+(v1[i]*v2[i]))
  }
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

module.exports = {dot, sumEach, mulEach}
