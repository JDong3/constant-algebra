const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const rowAdd = require('../../src').mm.rowAdd
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mm.rowAdd', function() {
  describe('gives the result of elementary row addition on a matrix', function() {
    it('can add the 1th row to the 0th row on a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(1), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(rowAdd(m.i33, 0, 1, 1).equals(l))
    }),
    it('can add the 1th row twice to the 2th row of a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(2), F(1)])])
      assert(rowAdd(m.i33, 2, 1, 2).equals(l))
    })
  })
})
