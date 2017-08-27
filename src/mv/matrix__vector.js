const List = require('immutable').List
const math = require("mathjs")

/**
 * generates a row vector.
 * @param {matrix} m: is a matrix representation
 * @param {number} n: is thie index of the column you want to get, 0<=n<m.length
 * @return {vector} a vector representation of the nth row of m
 */
const row = (m, n) => (
  m.get(n))

/**
 * generates a colum vector.
 * @param  {matrix} m: is a matrix representation
 * @param  {number} n: is index of the column you want to get, 0<=n< l[0].length
 * @return {vector} a vector representation of the nth column of n
 */
const column = (m, n) => (
  m.map((v) => (
    v.get(n))))

/**
 * gemnerates a diageonal vector.
 * @param {matrix} m: is a matrix representation
 * @param {number} i:
 * @param {vector} res:
 * @return {vector} the vector representation of the diagonal of m
 */
const diagonal = (matrix) => (
  matrix.map((vector, row) => (
    vector.get(row))))

/**
 * generates a loose diagonal vector.
 * @param {matrix} m: is a 'verified' array of arrays of numbers
 * @param {number} i:
 * @param {vector} res:
 * @return {matrix} the vector representation of the loose diagonal of m
 */
const looseDiagonal = (m, i=0, res=List()) => {
  if (i >= math.min(m.size, m.get(0).size)) {
    return res
  } else {
    const updated = res.push(m.get(i).get(i))
    return looseDiagonal(m, i+1, updated)
  }
}

/**
 * generates an anti=diagonal vector.
 * @param {matrix} m: is a matrix representation
 * @param {number} i: is the index
 * @param {vector} res: is the result vector
 * @return {vector} the andi-diagonal of m
 */
const antiDiagonal = (matrix) => (
  matrix.map((vector, row) => (
    vector.get(-(row+1))
  ))
)

/**
 * generates a loose anti=diagonal vector.
 * @param {matrix} m: is a matrix representation
 * @param {number} i: is the index
 * @param {vector} res: is the result vector
 * @return {vector} the loose andi-diagonal of m
 */
const looseAntiDiagonal = (m, i=0, res=List()) => {
  if (i >= math.min(m.length, m[0].length)) {
    return res
  } else {
    const update = res.push(m[i][m.length-i-1])
    return looseAntiDiagonal(m, i+1, res)
  }
}

module.exports = {
  column, row, diagonal, looseDiagonal, antiDiagonal,looseAntiDiagonal
}
