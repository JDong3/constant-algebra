//objects of testing
const util = require('..').util

//testing
const assert = require('chai').assert

//resources
const m = require('../src').res.m
const v = require('../src').res.v

//objects
List = require('immutable').List
F = require('fraction.js')

describe('util.convertBool', function() {
  describe('converts a boolean value to a corresponding value either 1 or 0', function() {
    it('can convert a true to 1', function() {
      assert.equal(util.convertBool(true), 1)
    }),
    it('can convert a false to 0', function() {
      assert.equal(util.convertBool(false), 0)
    })
  })
})

describe('util.size.number', function() {
  describe('gives the length of the number in string form', function() {
    it('can determie the size of 0', function() {
      assert.equal(util.size.number(0), 1)
    }),
    it('can determine the size of 1', function() {
      assert.equal(util.size.number(1), 1)
    }),
    it('can determine the size of a negative number -1', function() {
      assert.equal(util.size.number(-1), 2)
    }),
    it('can determine the size of a 2 digit positive number 25', function() {
      assert.equal(util.size.number(25), 2)
    }),
    it('can determine the size of a 2 digit negative number -65', function() {
      assert.equal(util.size.number(-65), 3)
    })
  })
})
describe('util.size.fraction', function() {
  describe('gives the length of the fractionin string form', function() {
    it('can give the size of a single digit number 1', function() {
      assert.equal(util.size.fraction(F(1)), 1)
    }),
    it('can give the size of a fraction that is a negative integer -5', function() {
      assert.equal(util.size.fraction(F(-5)), 2)
    })
    it('can give the size of a fraction with denominator 1, 1/1', function() {
      assert.equal(util.size.fraction(F(1, 1)), 1)
    }),
    it('can give the size of a fraction with denominator not 1, 1/2', function() {
      assert.equal(util.size.fraction(F(1, 2)), 3)
    }),
    it('can give the size of a fraction with a negative numerator -13/17', function() {
      assert.equal(util.size.fraction(F(-13, 17)), 6)
    }),
    it('can give the size of a fraction with a negative denominator 13/-17', function() {
      assert.equal(util.size.fraction(F(13, -17)), 6)
    }),
    it('can give the size of a fraction with a negative numerator and denominator -13/-17', function() {
      assert.equal(util.size.fraction(F(-13, -17)), 5)
    })
  })
})
//util.test
describe('util.test.openParens', function() {
  describe('it tells you if the start of a string matches a openParens pattern', function() {
    it('can recognise an open parentheses, (', function(){
      assert.isOk(util.test.openParens('('))
    }),
    it('can recognise an open square bracket, [', function() {
      assert.isOk(util.test.openParens('['))
    }),
    it('can recognise an open curly bracket, {', function() {
      assert.isOk(util.test.openParens('{'))
    }),
    it('can recognise an open parens followed by a character, (a', function() {
      assert.isOk(util.test.openParens('(a'))
    }),
    it('cannot recognise a non openParens character, a', function() {
      assert.isNotOk(util.test.openParens('a'))
    })
  })
})
describe('util.test.closeParens', function() {
  describe('it tells you if the start of a string matches a closeParens pattern', function() {
    it('can recognise an close parentheses, )', function(){
      assert.isOk(util.test.closeParens(')'))
    }),
    it('can recognise an close square bracket, ]', function() {
      assert.isOk(util.test.closeParens(']'))
    }),
    it('can recognise an close curly bracket, }', function() {
      assert.isOk(util.test.closeParens('}'))
    }),
    it('can recognise an close parens followed by a character, )a', function() {
      assert.isOk(util.test.closeParens(')a'))
    }),
    it('cannot recognise a non closeParens character, a', function() {
      assert.isNotOk(util.test.closeParens('a'))
    })
  })
})
describe('util.test.divider', function() {
  describe('it tells you if the start of a string matches a divider pattern', function() {
    it('can recognise a comma, ,', function() {
      assert.isOk(util.test.divider(','))
    }),
    it('can recognise a comma followed by a character, ,a', function() {
      assert.isOk(util.test.divider(',a'))
    }),
    it('cannot recognise a non divider character, a', function() {
      assert.isNotOk(util.test.divider('a'))
    })
  })
})
describe('util.test.slash', function() {
  describe('it tells you if the start of a string matches a slash pattern', function () {
    it('can recognise a slash, /', function() {
      assert.isOk(util.test.slash('/'))
    }),
    it('can recognise a slash followed by a character, /a', function() {
      assert.isOk(util.test.slash('/a'))
    }),
    it('cannot recognise a non slash pattern, a', function() {
      assert.isNotOk(util.test.slash('a'))
    })
  })
})
describe('util.test.digit', function() {
  describe('it tells you if the start of a string matches a digit pattern', function() {
    it('can recognise a digit, 1', function() {
      assert.isOk(util.test.digit('1'))
    }),
    it('can recognise two digits, 34', function() {
      assert.isOk(util.test.digit('34'))
    }),
    it('can recognise a digit followed by a non digit character, 2a', function() {
      assert.isOk(util.test.digit('2a'))
    }),
    it('cannot recognise a non digit character, a', function() {
      assert.isNotOk(util.test.digit('a'))
    }),
    it('cannot recognise a non digit character followed by a digit, a2', function() {
      assert.isNotOk(util.test.digit('a2'))
    })
  })
})
describe('util.test.number', function() {
  describe('it tells you if the start of a string matches a number pattern', function() {
    it('can recognise a single digit number, 1', function() {
      assert.isOk(util.test.number('1'))
    }),
    it('can recognise a 2 digit number, 12', function() {
      assert.isOk(util.test.number('12'))
    }),
    it('can recognise a negative number, -123', function() {
      assert.isOk(util.test.number('-123'))
    }),
    it('can recognise a number followed by not number, 123a', function() {
      assert.isOk(util.test.number('123a'))
    }),
    it('cannot recognise a non number pattern followed by a number, a123', function() {
      assert.isNotOk(util.test.number('a123'))
    })
  })
})
describe('util.test.fraction', function() {
  describe('it tells you if the start of a string matches a fraction pattern', function() {
    it('can recognise a number, 123', function() {
      assert.isOk(util.test.fraction('123'))
    }),
    it('can recognise a negative number, -123', function() {
      assert.isOk(util.test.fraction('-123'))
    }),
    it('can recognise a fraction with positive num and denum, 13/17', function() {
      assert.isOk(util.test.fraction('13/17'))
    }),
    it('can recognise a fraction with negative num and positive denum, -13/17', function() {
      assert.isOk(util.test.fraction('-13/17'))
    }),
    it('can recognise a fraction with positive num and negative denum, 13/-17', function() {
      assert.isOk(util.test.fraction('13/-17'))
    }),
    it('can recognise a fraction with negative num and denum, -13/-17', function() {
      assert.isOk(util.test.fraction('-13/-17'))
    }),
    it('cannot recognise a non fraction pattern followed by a fraction, a13/17', function() {
      assert.isNotOk(util.test.fraction('a13/17'))
    })
  })
})
describe('util.test.vector', function() {
  describe('it tells you if the start of a string matches a vector pattern', function() {
    it('can recognise a vector with a single fraction. (13/17)', function() {
      assert.isOk(util.test.vector('(13/17)'))
    }),
    it('can recognise a vector with two fractions, (13/17,-1/3)', function() {
      assert.isOk(util.test.vector('(13/17,-1/3)'))
    }),
    it('can recognise a vector with 3 fractions, (13/17, -1/3, 20)', function() {
      assert.isOk(util.test.vector('(13/17,-1/3,20)'))
    }),
    it('can recognise a vector followed by a character, (1)a', function() {
      assert.isOk(util.test.vector('(1)a'))
    }),
    it('cannot recognise a non vector pattern followed by a vector, a(1)', function() {
      assert.isNotOk(util.test.vector('a(1)'))
    })
  })
})
describe('util.test.matrix', function() {
  describe('it tells you if the start of a string matches a matrix pattern', function() {
    it('can recognise a 1x1 matrix, ((13/17))', function() {
      assert.isOk(util.test.matrix('((13/17))'))
    }),
    it('can recognise a matrix wil two vectors, ((13/17,-13,2),(5,1,1/2))', function() {
      assert.isOk(util.test.matrix('((13/17,-13,2),(5,1,1/2))'))
    }),
    it('can recognose a matrix followed by a character, ((1))a', function() {
      assert.isOk(util.test.matrix('((1))a'))
    }),
    it('cannot recognise a character followed by a matrix, a((1))', function() {
      assert.isNotOk(util.test.matrix('a((1))'))
    })
  })
})
//util.extract
describe('util.extract.openParens', function() {
  describe('it can extract an openParens pattern from the start of a string', function() {
    it('can extract an open parentheses, (', function() {
      const res = util.extract.openParens('(')
      assert.equal(res.res, '(')
      assert.equal(res.size, 1)
    }),
    it('can extract an open square bracket, [', function() {
      const res = util.extract.openParens('[')
      assert.equal(res.res, '[')
      assert.equal(res.size, 1)
    }),
    it('can extract an open curly bracket, {', function() {
      const res = util.extract.openParens('{')
      assert.equal(res.res, '{')
      assert.equal(res.size, 1)
    }),
    it('can extract an openParens pattern followed by non openParens, (a', function() {
      const res = util.extract.openParens('(a')
      assert.equal(res.res, '(')
      assert.equal(res.size, 1)
    })
  })
})
describe('util.extract.closeParens', function() {
  describe('it extracts a closeParens pattern from the start of a string', function() {
    it('can extract a close parentheses, )', function() {
      const res = util.extract.closeParens(')')
      assert.equal(res.res, ')')
      assert.equal(res.size, 1)
    }),
    it('can extract a closeParens pattern followed by a character, )a', function() {
      const res = util.extract.closeParens(')a')
      assert.equal(res.res, ')')
      assert.equal(res.size, 1)
    })
  })
})
describe('util.extract.divider', function() {
  describe('it extracts a divider pattern from the start of a string', function() {
    it('can extract a comma, ,', function() {
      const res = util.extract.divider(',')
      assert.equal(res.res, ',')
      assert.equal(res.size, 1)
    }),
    it('can extract a comma followed by a character, ,a', function() {
      const res = util.extract.divider(',a')
      assert.equal(res.res, ',')
      assert.equal(res.size, 1)
    })
  })
})
describe('util.extract.slash', function() {
  describe('it extracts a slash pattern from the start of a string', function() {
    it('can extract a slash, /', function() {
      const res = util.extract.slash('/')
      assert.equal(res.res, '/')
      assert.equal(res.size, 1)
    }),
    it('can extract a slash followed by a character, /a', function() {
      const res = util.extract.slash('/a')
      assert.equal(res.res, '/')
      assert.equal(res.size, 1)
    })
  })
})
describe('util.extract.digit', function() {
  describe('it extract a digit pattern from the start of a string', function() {
    it('can extract a digit, 1', function() {
      const res = util.extract.digit('1')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    }),
    it('can extract a digit followed by a character, 1a', function() {
      const res = util.extract.digit('1a')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    })
  })
})
describe('util.extract.number', function() {
  describe('it extracts a number pattern from the start of a string', function() {
    it('can extract a single digit number, 1', function() {
      const res = util.extract.number('1')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    }),
    it('can extract a double digit number, 12', function() {
      const res = util.extract.number('12')
      assert.equal(res.res, 12)
      assert.equal(res.size, 2)
    }),
    it('can extract a negative number, -12', function() {
      const res = util.extract.number('-12')
      assert.equal(res.res, -12)
      assert.equal(res.size, 3)
    }),
    it('can extract a number followed by a character, -12a', function() {
      const res = util.extract.number('-12a')
      assert.equal(res.res, -12)
      assert.equal(res.size, 3)
    })
  })
})
describe('util.extract.fraction', function() {
  describe('it extracts the fraction at the start of a string', function() {
    it('can extract a number, -13', function() {
      const res = util.extract.fraction('-13')
      assert.isTrue(res.res.equals(F(-13)))
      assert.equal(res.size, 3)
    }),
    it('can extract a fraction with positive num and denum, 13/17', function() {
      const res = util.extract.fraction('13/17')
      assert.isTrue(res.res.equals(F(13, 17)))
      assert.equal(res.size, 5)
    }),
    it('can extract a fraction with negative num and positive denum, -13/17', function() {
      const res = util.extract.fraction('-13/17')
      assert.isTrue(res.res.equals(F(-13, 17)))
      assert.equal(res.size, 6)
    }),
    it('can extract a fraction with a positive num and negative denum, 13/-17', function() {
      const res = util.extract.fraction('13/-17')
      assert.isTrue(res.res.equals(F(13, -17)))
      assert.equal(res.size, 6)
    }),
    it('can extract a fraction with a negative num and denum, -13/-17', function() {
      const res = util.extract.fraction('-13/-17')
      assert.isTrue(res.res.equals(F(13, 17)))
      assert.equal(res.size, 7)
    }),
    it('can extract a non reduced fraction, 2/10', function() {
      const res = util.extract.fraction('2/10')
      assert.isTrue(res.res.equals(F(1, 5)))
      assert.equal(res.size, 4)
    })
  })
})
describe('util.extract.vector', function() {
  describe('it extracts a vector from the start of a string', function() {
    it('can extract a vector with a single fraction, (13/17)', function() {
      const res = util.extract.vector('(13/17)')
      const expected = List([F(13, 17)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 7)
    }),
    it('can extract a vector with 3 fractions, (1,2,1/3)', function() {
      const res = util.extract.vector('(1,2,1/3)')
      const expected = List([F(1), F(2), F(1, 3)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 9)
    }),
    it('can extract a vector followed by a character, (1)a', function() {
      const res = util.extract.vector('(1)a')
      const expected = List([F(1)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 3)
    })
  })
})
describe('util.extract.matrix', function() {
  describe('it extracts a matrix from the start of a string', function() {
    it('can extract a matrix with a single vector, ((1))', function() {
      const res = util.extract.matrix('((1))')
      const expected = List()
      const expected2 = expected.push(List([F(1)]))
      assert.isOk(res.res.equals(expected2))
      assert.equal(res.size, 5)
    }),
    it('can extract a matrix with 3 vectors, ((1),(1),(1))', function() {
      const res = util.extract.matrix('((1),(1),(1))')
      const expected = (
        List([
          List([F(1)]), List([F(1)]), List([F(1)])
        ])
      )
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 13)
    })
  })
})
