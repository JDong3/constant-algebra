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

  readNumberFailed: (index, newIndex, number) => (
    index === newIndex ||
    newIndex === -1 ||
    number.charAt(0).equals(slash) ||
    number.charAt(0).equals(slash) ||
    List(number.split('')).filter((element) => (
      !element.equals(slash)
    )).size > 1
  ),

  readOpenFailed: (index, newIndex) => (
    index === newIndex ||
    newIndex === -1
  ),

  readCloseFailed: (index, newIndex) => (
    index === newIndex || newIndex === -1
  ),

  readDivFailed: (index, newIndex) => (
    index === newIndex || newIndex === -1
  ),

  readVectorContentsFailed: (index, newIndex) => (
    index === newIndex || newIndex === -1
  ),

  readMatrixContentsFailed: (index, newIndex) => (
    index === newIndex || newIndex === -1
  ),

  readNumber: (string, i) => {
    if(!numbers.includes(string.charAt(i))) {
      return i
    } else {
      return util.readNumber(string, i+1)
    }
  },

  readDiv: (string, i) => {
    if(!dividers.includes(string.charAt(i))) {
      return i
    } else {
      return util.readDiv(string, i+1)
    }
  },

  readOpen: (string, i) => {
    if(openParens.includes(string.charAt(i))) {
      return i+1
    } else {
      return -1
    }
  },

  readClose: (string, i) => {
    if(closeParens.includes(string.charAt(i))) {
      return i+1
    } else {
      return -1
    }
  },

  readVectorContents: (string, i, divNext=false) => {
    if(!divNext) {
      // REVIEW: questionalble choice
      if (!util.readCloseFailed(i, util.readClose(string, i))) {
        return i
      }

      const newI = util.readNumber(string, i)
      if (util.readNumberFailed(i, newI, string.slice(i, newI))) {
        return -1
      } else {
        return util.readVectorContents(string, newI, true)
      }
    } else {
      const newI = util.readDiv(string, i)
      if (util.readDivFailed(i, newI)) {
        return -1
      } else {
        return util.readVectorContents(string, newI, false)
      }
    }
  },

  readVector: (string, i) => {
    const step1 = util.readOpen(string, i)
    if (util.readOpenFailed(i, step1)) {
      return -1
    }
    const step2 = util.readVectorContents(string, step1)
    if (util.readVectorContentsFailed(step2)) {
      return -1
    }
    const step3 = util.readClose(string, step2)
    if(util.readCloseFailed(step3)) {
      return -1
    }
    return step3
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
  }

}
console.log(util.readNumber('123.', 0))
module.exports = util
// IDEA:
// 1. check for matching parens
// 2. remove outer brackets
// 3. get ies of top level dividers
// 4. get a list of items separated by the top level dividers
// 5. confirm that each of those items are 'vector reprs'
