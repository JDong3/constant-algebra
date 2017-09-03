const lib = require('./lib.js')
const List = require('immutable').List

const ver = {
  is: {
    isMatrix: (matrix) => (
      List.isList(matrix) &&
      matrix.every((element) => (
        ver.is.isVector(element))) &&
      matrix.every((element) => (
        lib.vb.sameSize(element, matrix.get(0))
      ))
    ),
    isVector: (vector) => (
      List.isList(vector) &&
      vector.size > 0 &&
      vector.every(ver.is.isFraction)
    ),
    isFraction: (element) => (
      element.n !== undefined &&
      element.d !== undefined &&
      element.s !== undefined
    )
  },
  mbv: {
    isIdentityDefined: (m) => (
      ver.is.isMatrix(m)
    ),
    isSquareDefined: (m) => (
      ver.is.isMatrix(m)
    ),
    sameSizeDefined: (m1, m2) => (
      ver.is.isMatrix(m1) && ver.is.isMatrix(m2)
    )
  },
  mmv: {
    addDefined: (m1, m2) => (
      lib.mb.sameSize(m1, m2)
    ),
    adjugateDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    cofactorsDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    inverseDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m) &&
      (lib.mn.det(m) !== 0)
    ),
    minorDefined: (m, r, c) => (
      ver.is.isMatrix(m) &&
      ver.mvv.rowDefined(r) &&
      ver.mvv.columnDefined(c)
    ),
    mulDefined: (m1, m2) => (
      ver.is.isMatrix(m1) &&
      ver.is.isMatrix(m2) &&
       lib.mn.rows(m1) === lib.mn.columns(m2)
    ),
    rowAddDefined: (m, r1, r2, n) => (
      ver.is.isMatrix(m) &&
      ver.mmv.rowDefined(r1) &&
      ver.mmv.rowDefined(r2) &&
      ver.is.isFraction(n)
    ),
    rowScaleDefined: (m, r, n) => (
      ver.is.isMatrix(m) &&
      lib.mmv.rowDefined(r) &&
      ver.is.isFraction(n)
    ),
    rowSwapDefined: (m, r1, r2) => (
      ver.is.isMatrix(m) &&
      mmv.rowDefined(r1) &&
      mmv.rowDefined(r2)
    ),
    rrefDefined: (m) => (
      ver.is.isMatrix(m)
    ),
    subDefined: (m1, m2) => (
      lib.mb.sameSize(m1, m2)
    ),
    transposeDefined: (m) => (
      ver.is.isMatrix(m)
    )
  },
  mnv: {
    antiTraceDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    cofactorDefined: (m, r, c) => (
      ver.is.isMatrix(m) &&
      ver.is.rowDefined(m, r) &&
      ver.is.columnDefined(m, c)
    ),
    columnsDefined: (m) => (
      ver.is.isMatrix(m)
    ),
    detDefined: (m) => (
      ver.is.isMatrix(m) && lib.mb.isSquare(m)
    ),
    mulAntiTraceDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    mulTraceDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    rowsDefined: (m) => (
      ver.is.isMatrix(m)
    ),
    traceDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    )
  },
  mvv: {
    antiDiagonalDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    columnDefined: (m, n) => (
      ver.is.isMatrix(m) &&
      n >= 0 &&
      n <= m.get(0).size-1
    ),
    diagonalDefined: (m) => (
      ver.is.isMatrix(m) &&
      lib.mb.isSquare(m)
    ),
    rowDefined: (m, n) => (
      ver.is.isMatrix(m) &&
      n >= 0 &&
      n <= m.size-1
    )
  },
  vbv: {
    sameSizeDefined: (v1, v2) => (
      ver.is.isVector(v1) &&
      ver.is.isVector(v2)
    )
  },
  vnv: {
    dotDefined: (v1, v2) => (
      ver.is.isVector(v1) &&
      ver.is.isVector(v2) &&
      lib.vb.sameSize(v1, v2)
    )
  },
  vvv: {
    addDefined: (v1, v2) => (
      ver.is.isVector(v1) &&
      ver.is.isVector(v2) &&
      lib.vb.sameSize(v1, v2)
    ),
    scaleDefined: (v, n) => (
      ver.is.isVector(v) &&
      ver.is.isFraction(n)
    ),
    subDefined: (v1, v2) => (
      ver.is.isVector(v1) &&
      ver.is.isVector(v2) &&
      lib.vb.sameSize(v1, v2)
    )
  }
}

module.exports = ver
