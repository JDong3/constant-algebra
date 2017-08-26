const assert = require('chai').assert
const F = require('mathjs').fraction
const isMatrix = require('../../src/verification/isMatrix.js')
const List = require('immutable').List
const matrices = require('../../resources/matrices.js')

const spec = {
  verifyNonRectangularity: List([ List([F(0), F(0), F(0)]),
                                  List([F(0), F(0)]) ]),
  zeroVector3: List([F(0), F(0), F(0)]),
  verifyAlmostArrayOfArray: List([ List([F(0), F(0), F(0)]),
                                   F(0),
                                   List([F(0), F(0), F(0)]) ]),
  empty11: List([ List([]) ]),
  empty30: List([ List([]),
                  List([]),
                  List([]) ]),
  partialIdentity23: List([[F(1), F(0), F(0)],
                          [F(0), F(1), F(0)]])
}

describe('mb.verify', function() {
  describe('accepts rectangularity', function() {
    it('accepts 1x1 small square', function() {
      assert.isTrue(isMatrix(matrices.z11), 'a 1x1 square is a rectangle')
    }),
    it('accepts 2x2 larger square', function() {
      assert.isTrue(isMatrix(matrices.z22), 'a 2x2 square is a rectangle')
    }),
    it('accepts 3x3 largerer square', function() {
      assert.isTrue(isMatrix(matrices.z33))
    }),
    it('accepts 3x2 rectangle', function() {
      assert.isTrue(isMatrix(matrices.z32))
    }),
    it('accepts 2x3 rectangle', function() {
      assert.isTrue(isMatrix(matrices.z23))
    })
  }),
  describe('rejects non-rectangularity', function() {
    it('rejects different size rows', function() {
      assert.isFalse(isMatrix(spec.verifyNonRectangularity))
    })
  })
  describe('accepts array of array', function() {
    it('accepts base case', function() {
      assert.isTrue(isMatrix(matrices.z11))
    })
  })
  describe('rejects array of not array', function() {
    it('rejects array of int', function() {
      assert.isFalse(isMatrix(spec.zeroVector3))
    }),
    it('rejects array of mostly arrays but one int', function() {
      assert.isFalse(isMatrix(spec.verifyAlmostArrayOfArray))
    })
  })
  describe("rejects size 0", function() {
    it('rejects empty case', function() {
      assert.isFalse(isMatrix(spec.empty11))
    }),
    it('rejects width of 0', function() {
      assert.isFalse(isMatrix(spec.empty30))
    })
  })
})
