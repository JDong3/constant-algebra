const F = require('mathjs').fraction
const List = require('immutable').List
const matrices = require('./test/matrices.js')
const mm = require('./index.js').mm

/*
const frac = F(1, 2)
console.log(frac.mul(5))
console.log(frac);
console.log(List([F(1, 2)]).equals(List([F(1, 1)])))
*/

console.log(mm.mul(matrices.s31, matrices.s13))
