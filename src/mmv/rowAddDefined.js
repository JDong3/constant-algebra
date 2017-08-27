const rowAddDefined = (m, r1, r2, n) => (
  isMatrix(m) &&
    mmv.rowDefined(r1) &&
    mmv.rowDefined(r2) &&
    (n instanceof F))
