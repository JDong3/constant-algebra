const F = require('mathjs').fraction
const List = require('immutable').List
const matrices = require('./test/matrices.js')
const mm = require('./index.js').mm

//console.log(mm.mul(matrices.s31, matrices.s13))
mm.rref(matrices.s34)
//console.log(F(0).equals(0))
//console.log(mm.pivot(matrices.s33, 0, 0))
//const step1
//console.log(mm.applyPivot(matrices.s33, 0, 1))
