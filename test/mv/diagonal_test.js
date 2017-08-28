const assert = require('chai').assert
const describe = require('mocha').describe
const diagonal = require('../../src').mv.diagonal
const it = require('mocha').it
const List = require('immutable').List
const m = require('../../resources').matrices
const F = require('mathjs').fraction

describe('mv.diagonal', function() {
  describe('gives the diagonal of a square matrix', function() {
    it('can get the diagonal of a 3x3 matrix(m.s33)', function() {
      const l = List([F(0), F(4), F(8)])
      assert(diagonal(m.s33).equals(l))
    })
  })
})
