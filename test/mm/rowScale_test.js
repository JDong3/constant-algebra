const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const rowScale = require('../../src').mm.rowScale
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mm.rowScale', function() {
  describe('gives the result of elementary row scale on a matrix', function() {
    it('can scale the second row of a 3x3 matrix by 3 (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(3), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(rowScale(m.i33, 1, 3).equals(l))
    })
  })
})
