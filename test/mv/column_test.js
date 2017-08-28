const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const column = require('../../src').mv.column
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mv.column', function() {
  describe('gives a column vector of a matrix', function() {
    it('can get the 0th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(0), F(3), F(6)])
      assert(column(m.s33, 0))
    }),
    it('can get the 1th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(1), F(4), F(7)])
      assert(column(m.s33, 1))
    }),
    it('can get the 2th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(2), F(5), F(8)])
      assert(column(m.s33, 2))
    })
  })
})
