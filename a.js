const util = require('.').util
const List = require('immutable').List
const slash = '/'
const F = require('mathjs').fraction

function coolFunc(vector, vector2) {
  console.log(vector, vector2)
  console.log(vector.length === vector2.length)
  console.log(
    vector.every((element, i) => (
      element.equals(vector2[i])
    ))
  )
}
const v = [f(1), f(2), f(3)]
const v2 = [f(1), f(2), f(3)]
coolFunc(v, v)
