const Fraction = require('mathjs').fraction
const List = require('immutable').List
const matrices = require('./test/matrices.js')
const mm = require('./index.js').mm


const frac = Fraction(1, 2)
console.log(frac.mul(5))
console.log(frac);
