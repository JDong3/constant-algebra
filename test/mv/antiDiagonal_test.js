const antiDiagonal = require('../../src').mv.antiDiagonal
const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const List = require('immutable').List
const m = require('../../resources').matrices
const F = require('mathjs').fraction

describe('mv.antiDiagonal', function() {
  describe('gives the antiDiagonal of a square matrix', function() {
    it('can get the antiDiagonal of a 3x3 matrix(m.s33)', function() {
      const l = List([F(2), F(4), F(6)])
      assert(antiDiagonal(m.s33).equals(l))
    })
  })
})
