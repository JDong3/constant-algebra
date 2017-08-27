const antiTrace = (matrix) => (
  mv.antiDiagonal(matrix).reduce((a, b) => (
    a.add(b))))

module.exports = antiTrace
