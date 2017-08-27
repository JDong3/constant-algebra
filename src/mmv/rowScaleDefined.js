const rowScaleDefined = (m, r, n) => (
  isMatrix(m) &&
    mmv.rowDefined(r) &&
      (m instanceof F))
