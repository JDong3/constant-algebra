const List = require('immutable').List
const F = require('mathjs').fraction
const openParens = List(['(', '[', '{'])
const closeParens = List([')', ']', '}'])
const emptyCharAt = ''
const numbers = List(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
const dividers = List([','])
const slash = '/'

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
    }
    if(!divNext) {
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

  readMatrixContents: (string, i, divNext=false) => {
    if(!divNext) {
      // REVIEW: questionalble choice
      if (!util.readCloseFailed(i, util.readClose(string, i))) {
        return i
      }

      const newI = util.readVector(string, i)
      if (util.readVectorFailed(i, newI, string.slice(i, newI))) {
        return -1
      } else {
        return util.readMatrixContents(string, newI, true)
      }
    } else {
      const newI = util.readDiv(string, i)
      if (util.readDivFailed(i, newI)) {
        return -1
      } else {
        return util.readMatrixContents(string, newI, false)
      }
    }
  },

  readMatrix: (string, i) => {
    const step1 = util.readOpen(string, i)
    if (util.readOpenFailed(i, step1)) {
      return -1
    }
    const step2 = util.readMatrixContents(string, step1)
    if (util.readMatrixContentsFailed(step2)) {
      return -1
    }
    const step3 = util.readClose(string, step2)
    if(util.readCloseFailed(step3)) {
      return -1
    }
    return step3
  },

  removeSpaces: (string) => (
    List(string.split('')).filter((element) => (
      element.equals(' ')
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
  }
}
module.exports = util
// IDEA:
// 1. check for matching parens
// 2. remove outer brackets
// 3. get ies of top level dividers
// 4. get a list of items separated by the top level dividers
// 5. confirm that each of those items are 'vector reprs'
