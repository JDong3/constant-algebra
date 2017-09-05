const util = require('.').util
const List = require('immutable').List
const slash = '/'
const F = require('mathjs').fraction


const m = List([List([F(1), F(2), F(3)]),
                List([F(4), F(5), F(6/7)])])
console.log(util.matrixToStringList(m))
