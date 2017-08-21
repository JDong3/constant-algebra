const List = require('immutable').List
const matrices = require('./test/matrices.js')
const mm = require('./index.js').mm

console.log(mm.transpose(matrices.s34))
