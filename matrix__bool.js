/**
 * verifys that matrix is valid, ie. matrix represents a rectangular array of
 * ofjects
 * @param  {Matrix} m is a Matrix object
 * @return {bool}   whether the Matrix represents a rectangular array of object
 */
let verify = (m) => {
  let sameLength = (arr) => (arr.length == m[0].length)
  return m.every(sameLength)
};
/**
 * assuming that the matrix is verified, return the sqarity of the matrix
 * @param {Matrix} m as a Matrix object
 * @return {bool} whether the matrix is a square matrix or not
 */
let isSquare = (m) => (m.length == m[0].length)

console.log(verify([[1, 1, 1], [1, 1, 1], [1, 1, 1]]))