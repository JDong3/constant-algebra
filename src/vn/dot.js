const dot = (vector, vector2) => (
  vector.map((element, n) => (
    element.mul(vector2.get(n))
  )).reduce((a, b) => (
    a.add(b))))

module.exports = dot
