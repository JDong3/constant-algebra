const assert = require('chai').assert
const add = require('../../src').mm.add
const describe = require('mocha').describe
const F = require('mathjs').fraction
const it = require('mocha').it
const List = require('immutable').List
const m = require('../../resources').matrices

describe('mm.add', function() {
  describe('gives the sum of two same sized matrices', function() {
    it('can sum two 1x1 matrices', function() {
      const l = List([List([F(2)])])
      assert(add(m.i11, m.i11).equals(l))
    }),
    it('can sum two 2x2 matrices', function() {
      const l = List([List([F(2), F(0)]),
                      List([F(0), F(2)])])
      assert(add(m.i22, m.i22).equals(l))
    }),
    it('can sum two 4x3 matrices', function() {
      const l = List([List([F(0), F(2), F(4)]),
                      List([F(6), F(8), F(10)]),
                      List([F(12), F(14), F(16)]),
                      List([F(18), F(20), F(22)])])
      assert(add(m.s43, m.s43).equals(l))
    })
  })
})
