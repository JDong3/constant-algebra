const minorDefined = (m, r, c) => (
  isMatrix(m) &&
    mvv.rowDefined(r) &&
      mvv.columnDefined(c))
