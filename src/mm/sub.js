/**
 * perfomS subtraction for one matrix on another matrix
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return the result of m1 - m2
 */
const sub = (matrix, matrix2) => (
  matrix.map((vector, row) => (
    vector.map((element, column) => (
      element.sub(matrix2.get(row).get(column)))))))
