const R = require("ramda")

/**
 * verifys that matrix is valid, that the matrix represents a rectangular array
 * of ofjects.
 *
 * @param  {Matrix}
 * @return {bool} whether the Matrix represents a rectangular array of objects
 */
const verify = (m) => {
  return isArrayOfArrays(m) && isRectangular(m) && widthGeZero(m)
}


/**
 * a verify helper
 *
 */
const isArrayOfArrays = (m) => {
  const isArray = (m) => (m instanceof Array)
  return isArray(m) && R.all(isArray)(m)
}

/**
 * a verify helper
 *
 */
const isRectangular = (m) => {
  const sameLengthAsFirst = (l) => (l.length === m[0].length)
  return R.all(sameLengthAsFirst)(m)
}

/**
 * a verify helper
 *
 */
const widthGeZero = (m) => {
  const elementWidthGeZero = (l) => (l.length > 0)
  return R.all(elementWidthGeZero)(m)
}

const isSquare = (m) => (m.length == m[0].length)

const isIdentity = (m) => {
  const identity = (m, index=0) => {
    if(index >= m.length) {
      return true
    } else {
      return isRowOfIdentity(m[index], index) && identity(m, index+1)
    }
  }
  return isSquare(m) && identity(m)
}

const isRowOfIdentity = (l, rowNumber=0, index=0) => {
  if (index >= l.length) {
    return true;
  } else if (index == rowNumber) {
    return l[index] == 1 && isRowOfIdentity(l, rowNumber, index+1)
  } else {
    return l[index] == 0 && isRowOfIdentity(l, rowNumber, index+1)
  }
}

const addDefined = (m1, m2) => {
  const sameSize = m1.length == m2.length && m1[0].length == m2[0].length
  return sameSize
}

const subDefined = (m1, m2) => (addDefined(m1, m2))

const mulDefined = (m1, m2) => {}

const rowValid = (m, n) => (n >= 0 && n <= m.length-1)

const columnValid = (m, n) => (n >= 0 && n <= m[0].length-1)

module.exports = {verify,
                  isSquare,
                  isIdentity,
                  isRowOfIdentity,
                  addDefined,
                  subDefined,
                  rowValid,
                  columnValid}
