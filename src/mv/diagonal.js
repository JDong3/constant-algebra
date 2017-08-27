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

module.exports = diagonal
