const List = require('immutable').List
const F = require('mathjs').fraction
const openParens = List(['(', '[', '{'])
const closeParens = List([')', ']', '}'])
const emptyCharAt = ''
const numbers = List(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
const dividers = List([','])
const slash = '/'
const leftPad = require('left-pad')

const EMPTY_LIST = List()

/**
 * readThing starts reading the thing in 'string' at index 'i' and returns the index
 * at which the thing finishes + 1, or the same index as the input if the thing doesn't
 * exist at index 'i'
 */
const util = {

  readNumber: (string, i, res='') => {
    if(!(numbers.includes(string.charAt(i)) || string.charAt(i) === slash)) {
      const parsedNumber = util.parseNumber(res)
      if (!parsedNumber) {
        return undefined
      } else {
        return List([i, parsedNumber])
      }
    } else {
      return util.readNumber(string, i+1, res+string.charAt(i))
    }
  },

  readDiv: (string, i) => {
    if(dividers.includes(string.charAt(i))) {
      return true
    } else {
      return false
    }
  },

  readOpen: (string, i) => {
    if(openParens.includes(string.charAt(i))) {
      return true
    } else {
      return false
    }
  },

  readClose: (string, i) => {
    if(closeParens.includes(string.charAt(i))) {
      return true
    } else {
      return false
    }
  },

  readVectorContents: (string, i, divNext=false, res=EMPTY_LIST) => {
    //console.log('string:', string, 'i:', i, 'divNext:', divNext, 'res:', res)
    if(((divNext && res.size > 0) || res.size === 0) && util.readClose(string, i)) {
      return List([i, res])
    } else if(!divNext) {
      const result = util.readNumber(string, i)
      if (!result) {
        return undefined
      } else {
        return util.readVectorContents(string, result.get(0), true, res.push(result.get(1)))
      }
    } else {
      const result = util.readDiv(string, i)
      if (!result) {
        return undefined
      } else {
        return util.readVectorContents(string, i+1, false, res)
      }
    }
  },

  readVector: (string, i) => {
    const step1 = util.readOpen(string, i)
    if (!step1) {
      return undefined
    }
    const step2 = util.readVectorContents(string, i+1)
    if (!step2) {
      return undefined
    }
    const step3 = util.readClose(string, step2.get(0))
    if(!step3) {
      return undefined
    }
    return List([step2.get(0)+1, step2.get(1)])
  },

  readMatrixContents: (string, i, divNext=false, res=EMPTY_LIST) => {
    //console.log('string:', string, 'i:', i, 'devNext:', divNext, 'res:', res)
    if (((divNext && res.size > 0) || res.size === 0) && util.readClose(string, i)) {
      return res
    } else if(!divNext) {
      const result = util.readVector(string, i)
      if (!result) {
        return undefined
      } else {
        return util.readMatrixContents(string, result.get(0), true, res.push(result.get(1)))
      }
    } else {
      const result = util.readDiv(string, i)
      if (!result) {
        return undefined
      } else {
        return util.readMatrixContents(string, i+1, false, res)
      }
    }
  },

  readMatrix: (string, i) => {
    const step1 = util.readOpen(string, i)
    if (!step1) {
      return undefined
    }
    const step2 = util.readMatrixContents(string, step1)
    if (!step2) {
      return undefined
    }
    return step2
  },

  removeSpaces: (string) => (
    List(string.split('')).filter((element) => (
      element !== ' '
    )).reduce((a, b) => (
      a + b), '')
  ),

  parseNumber: (string) => {
    const invalidString = (
      string.length === 0 ||
      string.charAt(0) === slash ||
      string.charAt(string.length-1) === slash ||
      List(string.split('')).filter((element) => (
        element === slash
      )).size > 1
    )
    if (!invalidString) {
      const indexOfSlash = string.indexOf(slash)
      if(indexOfSlash == -1) {
        return F(parseInt(string, 10))
      } else {
        return F(
          parseInt(string.slice(0, indexOfSlash), 10),
          parseInt(string.slice(indexOfSlash+1, string.length), 10)
        )
      }
    } else {
      return undefined
    }
  },
  parseMatrix: (string) => (
    util.readMatrix(util.removeSpaces(string))
  ),

  matrixToStringList: (matrix, padding = '  ') => {
    const matrixOfStringRepr = util.stringRepr(matrix)
    const maxLength = util.maxLengthOfStringRepr(matrixOfStringRepr)
    return (
      matrixOfStringRepr.map((vectorOfStringRepr, index) => (
        '[ ' +
        vectorOfStringRepr.reduce((a, b, i) => (
          leftPad(a, maxLength.get(i)) + padding + leftPad(b, maxLength.get(i)))
        ) +
        ' ]')
      )
    )
  },

  maxLengthOfStringRepr: (matrix) => (
    matrix.get(0).map((element, index) => (
      matrix.map((vector) => (
        vector.get(index)
      ))
    )).map((vector) => (
      vector.reduce((a, b) => {
        if(a.length > b.length) {
          return a.length
        } else {
          return b.length
        }
      }, '')
    ))
  ),

  stringRepr: (matrix) => (
    matrix.map((vector) => (
      vector.map((element) => (
        util.fractionToString(element)
      ))
    ))
  ),


  fractionToString: (fraction) => {
    if(fraction.d === 1) {
      return (fraction.s * fraction.n).toString()
    } else {
      return (fraction.s * fraction.n).toString() + '/' + fraction.d.toString()
    }
  }
}
module.exports = util
