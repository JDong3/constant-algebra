const ca = require('./')
const List = require('immutable').List
const test = List([1]).equals(List([1]))
const test2 = List(List([1])).equals(List(List([1])))
console.log(test)
console.log(test2)
