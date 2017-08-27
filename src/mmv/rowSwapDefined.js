const rowSwapDefined = (m, r1, r2) => (
  isMatrix(m) &&
    mmv.rowDefined(r1) &&
      mmv.rowDefined(r2))
