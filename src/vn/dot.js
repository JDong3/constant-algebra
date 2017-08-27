const F = require('mathjs').fraction
const List = require('immutable').List

const dot = (v1, v2, i=0, res=F(0)) => {
  if(i >= v1.size) {
    return res
  } else {
    return dot(v1, v2, i+1, res.add((v1.get(i).mul(v2.get(i)))))
  }
}

module.exports = dot
