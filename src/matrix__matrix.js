const F = require('mathjs').fraction
const List = require('immutable').List
const mv = require('./matrix__vector.js')
const vn = require('./vector__number.js')
const vv = require('./vector__vector.js')

/**
 * finds the transpose of a matrix.
 * @param {matirx} m: is a matrix representation
 * @param {Number} i: is the index
 * @param {List} res: is the result matrix
 * @return a matrix that is the transpose of m
 */
const transpose = (m, i=0, res=List()) => {
  if (i >= m.get(0).size) {
    return res
  } else {
    const update = res.push(mv.column(m, i))
    return transpose(m, i+1, update)
  }
}


/**
 * perfoms addition for one matrix on another matrix
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @param {Number} i: is the index
 * @param {List} res: is the result matrix
 * @return the result of m1 + m2
 */
const add = (m1, m2, i=0, res=List()) => {
  if (i >= m1.size) {
    return res
  } else {
    const update = res.push(vv.add(m1.get(i), m2.get(i)))
    return add(m1, m2, i+1, update)
  }
}


/**
 * perfomS subtraction for one matrix on another matrix
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @param {Number} i: is the index
 * @param {List} res: is the result matrix
 * @return the result of m1 - m2
 */
const sub = (m1, m2, i=0, res=List()) => {
  if (i >= m1.size) {
    return res
  } else {
    const update = res.push(vv.sub(m1.get(i), m2.get(i)))
    return sub(m1, m2, i+1, update)
  }
}


/**
 * perfoms multiplication for one matrix on another matrix
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @param {Number} i: is the index
 * @param {List} res: is the result matrix
 * @return the result of m1 * m2
 */
const mul = (m1, m2, i=0, res=List()) => {
  if (i >= m1.size) {
    return res
  } else {
    const update = res.push(subMul(m1.get(i), m2))
    return mul(m1, m2, i+1, update)
  }
}
const subMul = (v, m, i=0, res=List()) => {
  if (i >= m.get(0).size) {
    return res
  } else {
    const update = res.push(vn.dot(v, mv.column(m, i)))
    return subMul(v, m, i+1, update)
  }
}


/**
 * performs elementary row swap on rows indexed r1 and r2
 * @param {List} m: is a matrix representation
 * @param {Number} r1: is the index of the first row
 * @param {Number} r2: is the index of the second row
 * @return {List}
 */
const rowSwap = (m, r1, r2) => {
  const step1 = m.set(r1, m.get(r2))
  const step2 = step1.set(r2, m.get(r1))
  return step2
}

const rowAdd = (m, r1, r2, n=1) => (m.set(r1, rowAfterAdding(m, r1, r2, n)))
const rowAfterAdding = (m, r1, r2, n=1) => (vv.add(m.get(r1), vv.scale(m.get(r2), n)))

const rowScale = (m, r, n=1, i=1) => (m.set(r, vv.scale(m.get(r), n)))

const rref = (m, c=0, r=0) => {
  if (c >= m.size) {
    console.log('res: ', m);
    return m
  } else {
    const pivotRow = pivot(m, c, r)
    console.log('pivot: ', pivotRow);
    if (pivotRow) {
      // step1: scale the the pivot to have a value of 1
      const step1 = rowScale(m, pivotRow, m.get(pivotRow).get(c).inverse())
      console.log('after scale: ', step1);
      // step2: swap the row with the pivot and the row you are trying to rrefify
      const step2 = rowSwap(step1, pivotRow, r)
      console.log('after swap:', step2);
      // step3: use row addition to make the column that you are trying to rrefify
      //   be the only cell that has a non-zero value
      const toApplyPivot = applyPivot(step2, c, r)
      console.log('one pass: ', toApplyPivot, '\n');
      // step4: attempty to rrefify the next column and row
      return rref(toApplyPivot, c+1, r+1)
    } else {
      return rref(m, c+1, r)
    }
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
const pivot = (m, c, r) => {
  if (r > m.size) {
    return undefined
  } else if (!m.get(r).get(c).equals(0)) {
    return r
  } else {
    return pivot(m, c, r+1)
  }
}// find a pivot for the nth column, starting from row r
const applyPivot = (m, c, r, i=0) => {
  if (i >= m.size) {
    return m
  } else if (r !== i) {
    console.log(r, i)
    console.log(m.get(i).get(c).neg());
    const update = rowAdd(m, i, r, m.get(i).get(c).neg())
    console.log('apply pivot: ', i, update, '\n');
    return applyPivot(update, c, r, i+1)
  } else {
    console.log(r, i)
    return applyPivot(m, c, r, i+1)
  }
}

const minor = () => {}
const cofactors = () => {}
const adjugate = () => {}
const inverse = () => {}
module.exports = {transpose, add, sub, mul, rowSwap, rowAdd, rowScale, rref, pivot, applyPivot}
