const mulTrace = (matirx) => (
  mv.diagonal(matrix).reduce((a, b) => (
    a.mul(b))))

module.exports = mulTrace
