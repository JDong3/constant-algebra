const cofactorDefined = (m, r, c) => (
  isMatrix(m) &&
    rowDefined(m, r) &&
      columnDefined(m, c))
