const R = require("ramda")

const dot = (v1, v2, i=0, res=0) => {
  if(i >= v1.length) {
    return res
  } else {
    return dot(v1, v2, i+1, res+(v1[i]*v2[i]))
  }
}

module.exports = {dot}
