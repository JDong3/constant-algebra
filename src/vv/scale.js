const scale = (vector, amount) => (
    vector.map((element) => (
      element.mul(amount))))

module.exports = scale
