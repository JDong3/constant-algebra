const vectorEquals = (v1, v2) => (bothVectors(v1, v2) && sameLength(v1, v2) &&
                                  sameElements(v1, v2))

const bothVectors = (v1, v2) => (v1 instanceof Array && v2 instanceof Array)

const sameLength = (v1, v2) => (v1.length == v2.length)


const sameElements = (v1, v2, i=0) => {
  if (i >= v1.length) {
    return true
  } else {
    return v1[i] === v2[i] && sameElements(v1, v2, i+1)
  }
}


module.exports = vectorEquals
