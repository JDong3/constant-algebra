const ver = {
  mvv: {
    columnDefined: (m, n) => (
      isMatrix(m) &&
      n >= 0 &&
      n <= m.get(0).size-1
    ),
    rowDefined: (m, n) => (
      isMatrix(m) &&
      n >= 0 &&
      n <= m.size-1
    )
  }
}

module.exports = ver
