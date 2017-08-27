const add = (vector, vector2) => (
  vector.map((element, n) => (
    element.add(vector2.get(n)))))

module.exports = add
