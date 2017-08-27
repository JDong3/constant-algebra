const inverseDefined = (m) => (
  isMatrix(m) &&
    mb.isSquare(m) &&
      (mn.det(m) !== 0))
