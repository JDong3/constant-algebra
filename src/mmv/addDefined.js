/**
 * checks if addition is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether addition is defined for m1 and m2
 */
const addDefined = (m1, m2) => (
  mb.sameSize(m1, m2))
