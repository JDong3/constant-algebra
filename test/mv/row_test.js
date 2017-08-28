const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const row = require('../../src').mv.row
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mv.row', function() {
  describe('gives a row vector of a matrix', function() {
    it('can give the 0th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(0), F(1), F(2)])
      assert(row(m.s33, 0).equals(l))
    }),
    it('can give the 1th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(3), F(4), F(5)])
      assert(row(m.s33, 1).equals(l))
    }),
    it('can give the 2th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(6), F(7), F(8)])
      assert(row(m.s33, 2).equals(l))
    })
  })
})
