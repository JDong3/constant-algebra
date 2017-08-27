const mulAntiTrace = (m) => (
  mv.antiDiagonal(matrix).reduce((a, b) => (
    a.mul(b))))

module.exports = mulAntiTrace
