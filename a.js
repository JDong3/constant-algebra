const List = require('immutable').List
const matrices = require('./test/matrices.js')


console.log(List.isList(matrices.z11))
console.log(matrices.z11.every(v => List.isList(v)))
