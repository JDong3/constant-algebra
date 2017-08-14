const R = require("ramda")

/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 *
 * @param  {Matrix}
 * @return {bool}   whether the Matrix represents a rectangular array of objects
 */
let verify = (m) => {
  return isArrayOfArrays(m) && isRectangular(m) && widthGeZero(m)
}


/**
 * a verify helper
 *
 */
let isArrayOfArrays = (m) => {
  let isArray = (m) => (m instanceof Array) 
  return isArray(m) && R.all(isArray)(m) 
}

/**
 * a verify helper
 *
 */
let isRectangular = (m) => {
  let sameLengthAsFirst = (l) => (l.length === m[0].length)
  return R.all(sameLengthAsFirst)(m)
}

/**
 * a verify helper
 *
 */
let widthGeZero = (m) => {
  let elementWidthGeZero = (l) => (l.length > 0)
  return R.all(elementWidthGeZero)(m)
}

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
  } else if (index == rowNumber) {
    return l[index] == 1 && isRowOfIdentity(l, rowNumber, index+1)
  } else {
    return l[index] == 0 && isRowOfIdentity(l, rowNumber, index+1)
  }
}

let addDefined = (m, n) => {
  let sameSize = m.length == n.length && m[0].length == n[0].length
  return sameSize
}

let subDefined = (m, n) => (addDefined(m, n))

let rowValid = (m, n) => (n >= 0 && n <= m.length-1)

let columnValid = (m, n) => (n >= 0 && n <= m[0].length-1)

module.exports = {verify,
                  isSquare,
                  isIdentity,
                  isRowOfIdentity,
                  addDefined,
                  subDefined,
                  rowValid,
                  columnValid}