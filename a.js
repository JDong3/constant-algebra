const List = require('immutable').List
const matrices = require('./test/matrices.js')
const mm = require('./index.js').mm

console.log(mm.mul(matrices.s34, matrices.s43))
console.log(mm.mul(matrices.s43, matrices.s34))

const l1 =List([List([ 42, 48, 54 ]),List([ 114, 136, 158 ]),List([ 186, 224, 262 ]) ])
List([List([ 20, 23, 26, 29 ]),List([ 56, 68, 80, 92 ]),List([ 92, 113, 134, 155 ]),List([ 128, 158, 188, 218 ]) ])
