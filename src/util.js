const List = require('immutable').List
const F = require('fraction.js')

const CARET = '^'
const CIFRAO = '$'
const DECIMAL = 10
const EMPTY_LIST = List()
const ZERO = F(0)

util = {
  listToFraction: (list) => {
    if(list.size === 1) {
      return F(list.get(0))
    } else if(list.size === 2) {
      return F(list.get(0), list.get(1))
    } else {
      return undefined
    }
  },
  convertBool: (bool) => (
    {true: 1, false: 0}[bool.toString()]
  ),
  size: {
    number: (number) => {
      if(Math.abs(number) < 1) {
        return 1
      } else {
        return Math.floor(Math.log10(Math.abs(number))) + 1 + util.convertBool(number<0)
      }
    },
    fraction: (fraction) => {
      if(fraction.d === 1) {
        return util.size.number(fraction.n) + util.convertBool(fraction.s === -1)
      } else {
        return util.size.number(fraction.n) + 1 + util.size.number(fraction.d) + util.convertBool(fraction.s === -1)
      }
    },
    vector: (vector, index=ZERO, size=ZERO) => {
    }
  },
  test: {
    trivialTester: (regex) => (
      (str) => (RegExp(regex).test(str))
    ),
    openParens: (str) => (util.test.trivialTester('^' + util.regex.openParens())(str)),
    closeParens: (str) => (util.test.trivialTester('^' + util.regex.closeParens())(str)),
    divider: (str) => (util.test.trivialTester('^' + util.regex.divider())(str)),
    slash: (str) => (util.test.trivialTester('^' + util.regex.slash())(str)),
    digit: (str) => (util.test.trivialTester('^' + util.regex.digit())(str)),
    number: (str) => (util.test.trivialTester('^' + util.regex.number())(str)),
    fraction: (str) => (util.test.trivialTester('^' + util.regex.fraction())(str)),
    vector: (str) => (util.test.trivialTester('^' + util.regex.vector())(str)),
    matrix: (str) => (util.test.trivialTester('^' + util.regex.matrix())(str))
  },
  extract: {
    trivialExtractor: (regex) => (
      (str) => {
        const res = RegExp(regex).exec(str)
        return {res: res[0], size:res[0].length}
      }
    ),
    openParens: (str) => (util.extract.trivialExtractor('^'+util.regex.openParens())(str)),
    closeParens: (str) => (util.extract.trivialExtractor('^'+util.regex.closeParens())(str)),
    divider: (str) => (util.extract.trivialExtractor('^'+util.regex.divider())(str)),
    slash: (str) => (util.extract.trivialExtractor('^'+util.regex.slash())(str)),
    digit: (str) => {
      const res = RegExp('^'+util.regex.digit()).exec(str)
      return {res: parseInt(res[0], DECIMAL), size: res[0].length}
    },
    number: (str) => {
      const res = RegExp('^'+util.regex.number()).exec(str)
      return {res: parseInt(res[0], DECIMAL), size: res[0].length}
    },
    fraction: (str, index=0, res=EMPTY_LIST) => {
      const isNumber = util.parse.number(str.slice(index))
      const isSlash = util.parse.slash(str.slice(index))
      if(isNumber) {
        return util.extract.fraction(str, index+isNumber.size, res.push(isNumber.res))
      } else if(isSlash) {
        return util.extract.fraction(str, index+1, res)
      } else {
        return {res: util.listToFraction(res), size: index}
      }
    },
    vector: (str, index=0, res=EMPTY_LIST) => {
      const isFraction = util.parse.fraction(str.slice(index))
      const isOpenParens = util.parse.openParens(str.slice(index))
      const isDivider = util.parse.divider(str.slice(index))
      if(isFraction) {
        return util.extract.vector(str, index+isFraction.size, res.push(isFraction.res))
      } else if(isOpenParens || isDivider) {
        return util.extract.vector(str, index+1, res)
      } else {
        return {res: res, size: index+1}
      }
    },
    matrix: (str, index=0, res=EMPTY_LIST) => {
      const isVector = util.parse.vector(str.slice(index))
      const isOpenParens = util.parse.openParens(str.slice(index))
      const isDivider = util.parse.divider(str.slice(index))
      if(isVector) {
        return util.extract.matrix(str, index+isVector.size, res.push(isVector.res))
      } else if(isOpenParens || isDivider) {
        return util.extract.matrix(str, index+1, res)
      } else {
        return {res: res, size: index+1}
      }
    }
  },
  parse: {
    trivialParser: (tester, extractor) => (
      (str) => {
        if(!tester(str)) {
          return undefined
        } else {
          return extractor(str)
        }
      }
    ),
    openParens: (str) => (
      util.parse.trivialParser(util.test.openParens, util.extract.openParens)(str)
    ),
    closeParens: (str) => (
      util.parse.trivialParser(util.test.closeParens, util.extract.closeParens)(str)
    ),
    divider: (str) => (
      util.parse.trivialParser(util.test.divider, util.extract.divider)(str)
    ),
    slash: (str) => (
      util.parse.trivialParser(util.test.slash, util.extract.slash)(str)
    ),
    digit: (str) => (
      util.parse.trivialParser(util.test.digit, util.extract.digit)(str)
    ),
    number: (str) => (
      util.parse.trivialParser(util.test.number, util.extract.number)(str)
    ),
    fraction: (str) => (
      util.parse.trivialParser(util.test.fraction, util.extract.fraction)(str)
    ),
    vector: (str) => (
      util.parse.trivialParser(util.test.vector, util.extract.vector)(str)
    ),
    matrix: () => (
      util.parse.trivialParser(util.test.matrix, util.extract.matrix)(str)
    )
  },
  regex: {
    digit: () => ('(\\d)'),
    number: () => ('((-|)(\\d)+)'),
    fraction: () => {
      const number = util.regex.number()
      return `((${number}\\/${number})|${number})`
    },
    openParens: () => ('(\\(|\\{|\\[)'),
    closeParens: () => ('(\\)|\\}|\\])'),
    divider: () => ('(\\,)'),
    slash: () => ('(\\/)'),
    vector: () => {
      const openParens = util.regex.openParens()
      const fraction = util.regex.fraction()
      const divider = util.regex.divider()
      const closeParens = util.regex.closeParens()
      return `(${openParens}${fraction}(${divider}${fraction})*${closeParens})`
    },
    matrix: () => {
      const openParens = util.regex.openParens()
      const vector = util.regex.vector()
      const divider = util.regex.divider()
      const closeParens = util.regex.closeParens()
      return `(${openParens}${vector}(${divider}${vector})*${closeParens})`
    }
  }
}

module.exports = util
