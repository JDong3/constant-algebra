module.exports{verify, inSquare, isIdentity, isRowOfIdentity}

const R = require("ramda")

/**
 * verifys that matrix is valid, ie. matrix represents a rectangular array of
 * ofjects
 * @param  {Matrix} m is a Matrix object
 * @return {bool}   whether the Matrix represents a rectangular array of object
 */
let verify = (m) => {
  let rowLength = m[0].length
  let sameLength = (l) => (l.length === rowLength)
  return R.all(sameLength)(m)
}
/**
 * assuming that the matrix is verified, return the sqarity of the matrix
 * @param {Matrix} m as a Matrix object
 * @return {bool} whether the matrix is a square matrix or not
 */
let isSquare = (m) => (m.length == m[0].length)

let isIdentity = (m) => {
  let identity = (m, index=0) => {
    if(index >= m.length) {
      return true
    } else {
      return isRowOfIdentity(m[index], index) && identity(m, index+1)
    }
  }
  return isSquare(m) && identity(m)
}

let isRowOfIdentity = (l, rowNumber=0, index=0) => {
  if (index >= l.length) {
    return true;
  } else if (index == rowNumber) => {
    return l[index] == 1 && isRowOfIdentity(l, rowNumber, index+1)
  } else {
    return l[index] == 0 && isRowOfIdentity(l, rowNumber, index+1)
  }
}

let addDefined = (m, n) => {
  let valid = verify(m) && verify(n)
  let sameSize = m.length == n.length && m[0].length == m[0].length
  return valid && sameSize
}

let subDefined = (m, n) => (addDefined(m, n)



