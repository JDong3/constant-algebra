/**
 * checks if subtraction is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether subtraction is defined for m1 by m2
 */
const subDefined = (m1, m2) => (
  mb.sameSize(m1, m2))
