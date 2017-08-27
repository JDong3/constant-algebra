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

module.exports = antiDiagonal
