const trace = (matrix) => (
  mv.diagonal(matrix).reduce((a, b) => (
    a.add(b))))

module.exports = trace
