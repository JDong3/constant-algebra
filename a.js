const ca = require('./')
const List = require('immutable').List
const F = require('fraction.js')


const res = ns.util.extract.matrix('((1),(1),(1))')
const expected = List([
  List([F(1)])
])

console.log(res.res)
console.log(expected)
