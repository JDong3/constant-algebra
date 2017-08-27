/**
 * checks if multiplication is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether matrix multiplication is defined for m1 my m2
 */
const mulDefined = (m1, m2) => (
  isMatrix(m1) &&
    isMatrix(m2) &&
       mn.rows(m1) === mn.columns(m2))
