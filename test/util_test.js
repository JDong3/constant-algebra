const util = require('..').util
const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List

describe('util.parseNumber', function() {
  describe('parses a number and give the fraction that represents it', function() {
    it('can parse a number with no slash', function () {
      const number = '123'
      assert(util.parseNumber(number).equals(F(123)))
    }),
    it('can parse a number with 1 slash', function() {
      const number = '12/34'
      assert(util.parseNumber(number).equals(F(12, 34)))
    }),
    it('cannot parse a number with slash a front', function() {
      const number = '/123'
      assert.isNotOk(util.parseNumber(number))
    })
  })
})

describe('util.readNumber', function() {
  describe('reads a number from a string and returns a List of ending index + 1 and read value, otherwise falsy', function() {
      it('can read a string of just a number at 0 index', function() {
        const string = '123'
        const i = 0
        assert(util.readNumber(string, i).equals(List([3, F(123)])))
      }),
      it('can read a string of numbers and letters at 0 index', function () {
        const string = '12a'
        const i = 0
        assert(util.readNumber(string, i).equals(List([2, F(12)])))
      }),
      it('can read a string of numbers and letters at 3 index', function() {
        const string = 'abc123'
        const i = 3
        assert(util.readNumber(string, i).equals(List([6, F(123)])))
      }),
      it('can read a string with a slash in it', function() {
        const string = '12/34'
        const i = 0
        assert(util.readNumber(string, i).equals(List([5, F(12, 34)])))
      }),
      it('cannot read a letter', function() {
        const string = 'abc'
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      }),
      it('cannot read nothing', function() {
        const string = ''
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      }),
      it('cannot read a number with a slash at the front', function() {
        const string = '/123'
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      })
    })
})


describe('util.readDiv', function() {
  describe('reads a divider from a string at index, truthy on success, falsy on failure', function() {
    it('can read a divider at index 1', function() {
      const string = '0,'
      const i = 1
      assert(util.readDiv(string, i))
    }),
    it('cannot read no divider', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readDiv(string, i))
    }),
    it('passes on reading nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readDiv(string, i))
    })
  })
})

describe('util.readOpen', function() {
  describe('reads a open parens from a string at index and returns the index + 1 of where it ends, falsy on failure', function() {
    it('can read a open parens at index 1', function() {
      const string = '0['
      const i = 1
      assert(util.readOpen(string, i))
    }),
    it('cannot read no open parens', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readOpen(string, i))
    }),
    it('cannot read nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readOpen(string, i))
    })
  })
})

describe('util.readClose', function() {
  describe('reads a close parens from a string at index and returns the index + 1 of where it ends, falsy on failure', function() {
    it('can read a close parens at index 1', function() {
      const string = '0)'
      const i = 1
      assert(util.readClose(string, i))
    }),
    it('cannot read no open parens', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readClose(string, i))
    }),
    it('cannot read nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readClose(string, i))
    })
  })
})

describe('util.readVector', function() {
  describe('reads a vector repr, return the index of the end + 1 and a list that represents the vector, falsy on failure', function() {
    it('can read a well formed vector', function() {
      const vector = '[1,2,3]'
      const l = List([7, List([F(1), F(2), F(3)])])
      assert(util.readVector(vector, 0).equals(l))
    }),
    it('can read a well formed vector with fractions', function() {
      const vector = '[1/2,2/3,123/456]'
      const l = List([17, List([F(1, 2), F(2, 3), F(123, 456)])])
      assert(util.readVector(vector, 0).equals(l))
    })
  })
})
