const List = require('immutable').List
const math = require('mathjs')

const add = (v1, v2, i=0, res=List()) => {
  if (i >= v1.size) {
    return res;
  } else {
    const update = res.push(v1.get(i) + v2.get(i))
    return add(v1, v2, i+1, update)
  }
}

const sub = (v1, v2, i=0, res=List()) => {
  if (i >= v1.size) {
    return res;
  } else {
    const update = res.push(v1.get(i) - v2.get(i))
    return sub(v1, v2, i+1, update)
  }
}

const scale = (v, n) => (v.map(k => k*n))

module.exports = {add,
                  sub,
                  scale
                 }
