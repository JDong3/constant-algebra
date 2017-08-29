const lib = require('./lib.js')

const ver = {
  is: {
    isMatrix: (matrix) => (
      List.isList(matrix) &&
      matrix.every((element) => (
        lib.is.isVector(element))) &&
      matrix.every((element) => (
        lib.vb.sameSize(element, matrix.get(0))
      ))
    ),
    isVector: (vector) => (
      List.isList(vector) &&
      vector.size > 0 &&
      vector.every(lib.is.isFraction)
    ),
    isFraction: (element) => (
      element.n !== undefined &&
      element.d !== undefined &&
      element.s !== undefined
    )
  },
  mbv: {
    isIdentityDefined: (m) => (
      isMatrix(m)
    ),
    isSquareDefined: (m) => (
      isMatrix(m)
    ),
    sameSizeDefined: (m1, m2) => (
      isMatrix(m1) && isMatrix(m2)
    )
  }
  mmv: {
    addDefined = (m1, m2) => (
      mb.sameSize(m1, m2)
    ),
    adjugateDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    cofactorsDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    inverseDefined = (m) => (
      isMatrix(m) &&
      mb.isSquare(m) &&
      (mn.det(m) !== 0)
    ),
    minorDefined = (m, r, c) => (
      isMatrix(m) &&
      mvv.rowDefined(r) &&
      mvv.columnDefined(c)
    ),
    mulDefined = (m1, m2) => (
      isMatrix(m1) &&
      isMatrix(m2) &&
       mn.rows(m1) === mn.columns(m2)
    ),
    rowAddDefined = (m, r1, r2, n) => (
      isMatrix(m) &&
      mmv.rowDefined(r1) &&
      mmv.rowDefined(r2) &&
      isFraction(n)
    ),
    rowScaleDefined = (m, r, n) => (
      isMatrix(m) &&
      mmv.rowDefined(r) &&
      isFraction(n)
    ),
    rowSwapDefined = (m, r1, r2) => (
      isMatrix(m) &&
      mmv.rowDefined(r1) &&
      mmv.rowDefined(r2)
    ),
    rrefDefined = (m) => (
      isMatrix(m)
    ),
    subDefined = (m1, m2) => (
      mb.sameSize(m1, m2)
    ),
    transposeDefined = (m) => (
      isMatrix(m)
    )
  },
  mnv: {
    antiTraceDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    cofactorDefined = (m, r, c) => (
      isMatrix(m) &&
      rowDefined(m, r) &&
      columnDefined(m, c)
    ),
    columnsDefined = (m) => (
      isMatrix(m)
    ),
    detDefined = (m) => (
      isMatrix(m) && isSquare(m)
    ),
    mulAntiTraceDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    mulTraceDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    rowsDefined = (m) => (
      isMatrix(m)
    ),
    traceDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    )
  }
  mvv: {
    antiDiagonalDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    olumnDefined: (m, n) => (
      isMatrix(m) &&
      n >= 0 &&
      n <= m.get(0).size-1
    ),
    diagonalDefined = (m) => (
      isMatrix(m) &&
      isSquare(m)
    ),
    rowDefined: (m, n) => (
      isMatrix(m) &&
      n >= 0 &&
      n <= m.size-1
    )
  },
  vbv: {
    sameSizeDefined = (v1, v2) => (
      isVector(v1) &&
      isVector(v2)
    )
  },
  vnv: {
    dotDefined = (v1, v2) => (
      isVector(v1) &&
      isVector(v2) &&
      sameSize(v1, v2)
    )
  },
  vvv: {
    addDefined = (v1, v2) => (
      isVector(v1) &&
      isVector(v2) &&
      vb.sameSize(v1, v2)
    ),
    scaleDefined = (v, n) => (
      isVector(v) &&
      isFraction(n)
    ),
    subDefined = (v1, v2) => (
      isVector(v1) &&
      isVector(v2) &&
      vb.sameSize(v1, v2)
    )
  }
}

module.exports = ver
