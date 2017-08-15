module.exports = {column, diagonal, row};

const math = require("mathjs")
const R = require("ramda")

/**
 * nth column generator of a 2d list of numbers
 * @param  {Array} l is a 'verified' array of arrays of numbers
 * @param  {Number} n is index of the column you want to get, n < l.length
 * @return {Array}   nth column of l
 */
let column = (l, n) => {
  let nthElement = (l) => (l[n])
  let result = R.map(nthElement, l)
  return result
}

let row = (l, n) = > {
  return l[n]
}

/**
 * diagonal vector generator
 * @param  {Array} l is a 'verified' array of arrays of numbers
 * @return {Array}   is the an array of numbers on the diagonal of l
 */
let diagonal = (l) => {
  let minDimension = math.min(l.length, l[0].length)
  let diagonalBuilder = (diagonalList, i=0) => {
    if (diagonalList.legnth < minDimension) {
      diagonalList.push(l[i][i])
      return diagonalBuilder(diagonalList, i+1)
    } else {
      return diagonalList
    }
  }
  let result = diagonalBuilds([])
  return result;
}
