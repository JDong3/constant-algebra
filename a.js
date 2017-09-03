const util = require('.').util
const List = require('immutable').List
const slash = '/'

const string = 'abc'
const i = 0


//console.log(util.readNumberFailed(0, 1, string))
//console.log(util.readNumber('/123', 0))
console.log(util.readMatrix('[[1,2,3],[4,5,6],[7,8,9]]', 0))
