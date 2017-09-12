const util = require('.').util
const List = require('immutable').List
const slash = '/'
const F = require('mathjs').fraction
const m = require('.').matrices
const mm = require('.').mm

const ml = List([List([F(1), F(1), F(6,7)]),
                 List([F(1), F(1), F(1)])])

const lm = List([List([F(1), F(2), F(3)]),
                List([F(4), F(5), F(6/7)])])
util.matrixToStringList(lm).every((e) => {
  console.log(e)
  return true
})

const a = List([List(['1', '2', '3/4']),
                List(['4', '4', '4'])])
console.log(util.maxLengthOfStringRepr(a))
