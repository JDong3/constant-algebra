const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const rowSwap = require('../../src').mm.rowSwap
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mm.rowSwap', function() {
  describe('geves the result of elementary row swap on a matrix', function() {
    it('can swap the 1th row with the 1th row on a 3x3 matrix (m.i33)', function() {
      assert(rowSwap(m.i33, 1, 1).equals(m.i33))
    }),
    it('can swap the 0th row with the 2th row on a 3x3 amtrix (m.i33)', function() {
      const l = List([List([F(0), F(0), F(1)]),
                      List([F(0), F(1), F(0)]),
                      List([F(1), F(0), F(0)])])
      assert(rowSwap(m.i33, 0, 2).equals(l))
    })
  })
})
