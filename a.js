const F = require('mathjs').fraction
const List = require('immutable').List
const mm = require('./index.js').mm
const matrices = require('./resources/matrices.js')
const l = List([List([1, 0]),
                List([0, 1])])
console.log(l)
console.log(mm.minor(matrices.i33, 1, 1))
console.log(mm.minor(matrices.i33, 1, 1).equals(l))
