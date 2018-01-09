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
        return Math.floor(Math.log10(Math.abs(number))) + 1 + ns.util.convertBool(number<0)
      }
    },
    fraction: (fraction) => {
      if(fraction.d === 1) {
        return ns.util.size.number(fraction.n) + ns.util.convertBool(fraction.s === -1)
      } else {
        return ns.util.size.number(fraction.n) + 1 + ns.util.size.number(fraction.d) + ns.util.convertBool(fraction.s === -1)
      }
    },
    vector: (vector, index=ZERO, size=ZERO) => {
    }
  },
  test: {
    trivialTester: (regex) => (
      (str) => (RegExp(regex).test(str))
    ),
    openParens: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.openParens())(str)),
    closeParens: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.closeParens())(str)),
    divider: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.divider())(str)),
    slash: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.slash())(str)),
    digit: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.digit())(str)),
    number: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.number())(str)),
    fraction: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.fraction())(str)),
    vector: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.vector())(str)),
    matrix: (str) => (ns.util.test.trivialTester('^' + ns.util.regex.matrix())(str))
  },
  extract: {
    trivialExtractor: (regex) => (
      (str) => {
        const res = RegExp(regex).exec(str)
        return {res: res[0], size:res[0].length}
      }
    ),
    openParens: (str) => (ns.util.extract.trivialExtractor('^'+ns.util.regex.openParens())(str)),
    closeParens: (str) => (ns.util.extract.trivialExtractor('^'+ns.util.regex.closeParens())(str)),
    divider: (str) => (ns.util.extract.trivialExtractor('^'+ns.util.regex.divider())(str)),
    slash: (str) => (ns.util.extract.trivialExtractor('^'+ns.util.regex.slash())(str)),
    digit: (str) => {
      const res = RegExp('^'+ns.util.regex.digit()).exec(str)
      return {res: parseInt(res[0], DECIMAL), size: res[0].length}
    },
    number: (str) => {
      const res = RegExp('^'+ns.util.regex.number()).exec(str)
      return {res: parseInt(res[0], DECIMAL), size: res[0].length}
    },
    fraction: (str, index=0, res=EMPTY_LIST) => {
      const isNumber = ns.util.parse.number(str.slice(index))
      const isSlash = ns.util.parse.slash(str.slice(index))
      if(isNumber) {
        return ns.util.extract.fraction(str, index+isNumber.size, res.push(isNumber.res))
      } else if(isSlash) {
        return ns.util.extract.fraction(str, index+1, res)
      } else {
        return {res: ns.util.listToFraction(res), size: index}
      }
    },
    vector: (str, index=0, res=EMPTY_LIST) => {
      const isFraction = ns.util.parse.fraction(str.slice(index))
      const isOpenParens = ns.util.parse.openParens(str.slice(index))
      const isDivider = ns.util.parse.divider(str.slice(index))
      if(isFraction) {
        return ns.util.extract.vector(str, index+isFraction.size, res.push(isFraction.res))
      } else if(isOpenParens || isDivider) {
        return ns.util.extract.vector(str, index+1, res)
      } else {
        return {res: res, size: index+1}
      }
    },
    matrix: (str, index=0, res=EMPTY_LIST) => {
      const isVector = ns.util.parse.vector(str.slice(index))
      const isOpenParens = ns.util.parse.openParens(str.slice(index))
      const isDivider = ns.util.parse.divider(str.slice(index))
      if(isVector) {
        return ns.util.extract.matrix(str, index+isVector.size, res.push(isVector.res))
      } else if(isOpenParens || isDivider) {
        return ns.util.extract.matrix(str, index+1, res)
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
      ns.util.parse.trivialParser(ns.util.test.openParens, ns.util.extract.openParens)(str)
    ),
    closeParens: (str) => (
      ns.util.parse.trivialParser(ns.util.test.closeParens, ns.util.extract.closeParens)(str)
    ),
    divider: (str) => (
      ns.util.parse.trivialParser(ns.util.test.divider, ns.util.extract.divider)(str)
    ),
    slash: (str) => (
      ns.util.parse.trivialParser(ns.util.test.slash, ns.util.extract.slash)(str)
    ),
    digit: (str) => (
      ns.util.parse.trivialParser(ns.util.test.digit, ns.util.extract.digit)(str)
    ),
    number: (str) => (
      ns.util.parse.trivialParser(ns.util.test.number, ns.util.extract.number)(str)
    ),
    fraction: (str) => (
      ns.util.parse.trivialParser(ns.util.test.fraction, ns.util.extract.fraction)(str)
    ),
    vector: (str) => (
      ns.util.parse.trivialParser(ns.util.test.vector, ns.util.extract.vector)(str)
    ),
    matrix: () => (
      ns.util.parse.trivialParser(ns.util.test.matrix, ns.util.extract.matrix)(str)
    )
  },
  regex: {
    digit: () => ('(\\d)'),
    number: () => ('((-|)(\\d)+)'),
    fraction: () => {
      const number = ns.util.regex.number()
      return `((${number}\\/${number})|${number})`
    },
    openParens: () => ('(\\(|\\{|\\[)'),
    closeParens: () => ('(\\)|\\}|\\])'),
    divider: () => ('(\\,)'),
    slash: () => ('(\\/)'),
    vector: () => {
      const openParens = ns.util.regex.openParens()
      const fraction = ns.util.regex.fraction()
      const divider = ns.util.regex.divider()
      const closeParens = ns.util.regex.closeParens()
      return `(${openParens}${fraction}(${divider}${fraction})*${closeParens})`
    },
    matrix: () => {
      const openParens = ns.util.regex.openParens()
      const vector = ns.util.regex.vector()
      const divider = ns.util.regex.divider()
      const closeParens = ns.util.regex.closeParens()
      return `(${openParens}${vector}(${divider}${vector})*${closeParens})`
    }
  }
}
