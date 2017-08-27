const sub = (vector, vector2) => (
  vector.map((element, n) => (
    element.sub(vector2.get(n)))))

module.exports = sub
