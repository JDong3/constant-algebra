const List = require('immutable').List
const F = require('mathjs').fraction

const EMPTY_LIST = List()
const ZERO = F(0)

const lib = {
  
  mb: {
    isIdentity: (matrix) => (
      lib.mb.isSquare(matrix) &&
      lib.mb.isIdentityGivenisSquare(matrix)
    ),
    isIdentityGivenisSquare: (matrix) => (
      matrix.every((vector, row) => (
        vector.every((element, column) => (
          row !== column && element.equals(F(0)) ||
          row === column && element.equals(F(1))
        ))
      ))
    ),
    isSquare: (matrix) => (
      lib.mn.rows(matrix) === lib.mn.columns(matrix)
    ),
    sameSize: (matrix, matrix2) => (
      lib.mn.rows(matrix) === lib.mn.rows(matrix2) &&
      lib.mn.columns(matrix) === lib.mn.columns(matrix2)
    )
  },
  mm: {
    add: (matrix, matrix2) => (
      matrix.map((vector, row) => (
        vector.map((element, column) => (
          element.add(matrix2.get(row).get(column))
        ))
      ))
    ),
    adjugate: (matrix) => (
      lib.mm.transpose(lib.mm.cofactors(matrix))
    ),
    cofactors: (matrix) => (
      matrix.map((vector, row) => (
        vector.map((element, column) => (
          lib.mn.cofactor(matrix, row, column)
        ))
      ))
    ),
    inverse: (matrix) => (
      lib.mm.scale(
        lib.mm.adjugate(
          matrix, F(1, lib.mn.det(matrix))))
    ),
    minor: (matrix, row, column) => (
      matrix.delete(row)
            .map((vector) => (
              vector.delete(column)
            ))
    ),
    mul: (m1, m2, i=0, res=EMPTY_LIST) => {
      if (i >= m1.size) {
        return res
      } else {
        const update = res.push(lib.mm.subMul(m1.get(i), m2))
        return lib.mm.mul(m1, m2, i+1, update)
      }
    },
    subMul: (v, m, i=0, res=EMPTY_LIST) => {
      if (i >= m.get(0).size) {
        return res
      } else {
        const update = res.push(lib.vn.dot(v, lib.mv.column(m, i)))
        return lib.mm.subMul(v, m, i+1, update)
      }
    },
    rowAdd: (m, r1, r2, n=1) => (
      m.set(r1, lib.mm.rowAfterAdding(m, r1, r2, n))
    ),
    rowAfterAdding: (m, r1, r2, n=1) => (
      lib.vv.add(
        m.get(r1), lib.vv.scale(m.get(r2), n))
    ),
    rowScale: (m, r, n=1) => (
      m.set(r, lib.vv.scale(m.get(r), n))
    ),
    rowSwap: (m, r1, r2) => {
      const step1 = m.set(r1, m.get(r2))
      const step2 = step1.set(r2, m.get(r1))
      return step2
    },
    rref: (m, r=0, c=0) => {
      const pivotRow = lib.mm.pivot(m, r, c)
      if (c >= m.get(0).size) {
        return m
      } else if (pivotRow !== undefined) {
        // step1: scale the the pivot to have a value of 1
        const step1 = lib.mm.rowScale(m, pivotRow, m.get(pivotRow).get(c).inverse())
        // step2: swap the row with the pivot and the row you are trying to rrefify
        const step2 = lib.mm.rowSwap(step1, pivotRow, r)
        // step3: use row addition to make the column that you are trying to rrefify
        //   be the only cell that has a non-zero value
        const toApplyPivot = lib.mm.applyPivot(step2, r, c)
        // step4: attempty to rrefify the next column and row
        return lib.mm.rref(toApplyPivot, r+1, c+1)
      } else {
        return lib.mm.rref(m, r, c+1)
      }
    },
    /**
     * finds a pivot for a column of a matrix, starting the search from a row
     * @param {List} m: is a matrix representation
     * @param {Number} c: is the column that you want to find a pivot for
     * @param {Number} r: is the row that you want to start the search at
     * @return the first row that is on or after index r, on which a pivot for column
     *   c exists
     */
    pivot: (m, r, c) => {
      if (c >= lib.mn.columns(m) || r >= lib.mn.rows(m)) {
        return undefined
      } else if (!m.get(r).get(c).equals(0)) {
        return r
      } else {
        return lib.mm.pivot(m, r+1, c)
      }
    },// find a pivot for the nth column, starting from row r
    applyPivot: (m, r, c, i=0) => {
      if (i >= m.size) {
        return m
      } else if (r !== i) {
        const update = lib.mm.rowAdd(m, i, r, m.get(i).get(c).neg())
        return lib.mm.applyPivot(update, r, c, i+1)
      } else {
        return lib.mm.applyPivot(m, r, c, i+1)
      }
    },
    sub: (matrix, matrix2) => (
      matrix.map((vector, row) => (
        vector.map((element, column) => (
          element.sub(matrix2.get(row).get(column))
        ))
      ))
    ),
    transpose: (matrix, i=0, res=EMPTY_LIST) => {
      if (i >= matrix.get(0).size) {
        return res
      } else {
        return lib.mm.transpose(matrix, i+1, res.push(lib.mv.column(matrix, i)))
      }
    }
  },
  mn: {
    antiTrace: (matrix) => (
      lib.mv.antiDiagonal(matrix).reduce((a, b) => (
        a.add(b)
      ))
    ),
    cofactor: (matrix, row, column) => (
      F(-1).pow(column+row)
           .mul(matrix.get(row).get(column))
           .mul(
             lib.mn.det(
               lib.mm.minor(
                 matrix, row, column)))
    ),
    columns: (matrix) => (
      matrix.get(0).size
    ),
    det: (matrix) => {
      if (matrix.size === 1) {
        return matrix.get(0).get(0)
      } else {
        return lib.mn.sumRowCofactors(matrix, 0)
      }
    },
    sumRowCofactors: (matrix, row, i=0, res=ZERO) => {
      if (i >= lib.mn.columns(matrix)) {
        return res
      } else {
        //console.log(lib.mn.cofactor(matrix, row, i))
        return lib.mn.sumRowCofactors(
          matrix, row, i+1, res.add(lib.mn.cofactor(matrix, row, i)))
      }
    },
    mulAntiTrace: (matrix) => (
      lib.mv.antiDiagonal(matrix).reduce((a, b) => (
        a.mul(b)
      ))
    ),
    mulTrace: (matirx) => (
      lib.mv.diagonal(matrix).reduce((a, b) => (
        a.mul(b)
      ))
    ),
    rows: (matrix) => (
      matrix.size
    ),
    trace: (matrix) => (
      lib.mv.diagonal(matrix).reduce((a, b) => (
        a.add(b)
      ))
    )
  },
  mv: {
    antiDiagonal: (matrix) => (
      matrix.map((vector, row) => (
        vector.get(-(row+1))
      ))
    ),
    column: (matrix, n) => (
      matrix.map((vector) => (
        vector.get(n)
      ))
    ),
    diagonal: (matrix) => (
      matrix.map((vector, row) => (
        vector.get(row)
      ))
    ),
    row: (matrix, n) => (
      matrix.get(n)
    )
  },

  vb: {
    sameSize: (v1, v2) => (
      v1.size === v2.size
    )
  },

  vn: {
    dot: (vector, vector2) => (
      vector.map((element, n) => (
        element.mul(vector2.get(n))
      )).reduce((a, b) => (
        a.add(b)
      ))
    )
  },

  vv: {
    add: (vector, vector2) => (
      vector.map((element, n) => (
        element.add(vector2.get(n))
      ))
    ),
    scale: (vector, amount) => (
      vector.map((element) => (
        element.mul(amount)
      ))
    ),
    sub: (vector, vector2) => (
      vector.map((element, n) => (
        element.sub(vector2.get(n))
      ))
    )
  }
}



module.exports = lib
