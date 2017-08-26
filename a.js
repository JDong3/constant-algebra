const F = require('mathjs').fraction
const List = require('immutable').List
const mm = require('./index.js').mm
const matrices = require('./resources/matrices.js')

console.log(mm.transpose(matrices.s34))
