const rref = (m, r=0, c=0) => {
  const pivotRow = pivot(m, r, c)
  if (c >= m.get(0).size) {
    return m
  } else if (pivotRow !== undefined) {
    // step1: scale the the pivot to have a value of 1
    const step1 = rowScale(m, pivotRow, m.get(pivotRow).get(c).inverse())
    // step2: swap the row with the pivot and the row you are trying to rrefify
    const step2 = rowSwap(step1, pivotRow, r)
    // step3: use row addition to make the column that you are trying to rrefify
    //   be the only cell that has a non-zero value
    const toApplyPivot = applyPivot(step2, r, c)
    // step4: attempty to rrefify the next column and row
    return rref(toApplyPivot, r+1, c+1)
  } else {
    return rref(m, r, c+1)
  }
}

/**
 * finds a pivot for a column of a matrix, starting the search from a row
 * @param {List} m: is a matrix representation
 * @param {Number} c: is the column that you want to find a pivot for
 * @param {Number} r: is the row that you want to start the search at
 * @return the first row that is on or after index r, on which a pivot for column
 *   c exists
 */
const pivot = (m, r, c) => {
  if (!mvv.columnDefined(m, c) || !mvv.rowDefined(m, r)) {
    return undefined
  } else if (!m.get(r).get(c).equals(0)) {
    return r
  } else {
    return pivot(m, r+1, c)
  }
}// find a pivot for the nth column, starting from row r
const applyPivot = (m, r, c, i=0) => {
  if (i >= m.size) {
    return m
  } else if (r !== i) {
    const update = rowAdd(m, i, r, m.get(i).get(c).neg())
    return applyPivot(update, r, c, i+1)
  } else {
    return applyPivot(m, r, c, i+1)
  }
}
