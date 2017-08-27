const assert = require('chai').assert
const describe = require('mocha').describe
const F = require('mathjs').fraction
const it = require('mocha').it
const List = require('immutable').List
const mb = require('../../src/operation/matrix__bool.js')
const isMatrix = require('../../src/verification/isMatrix.js')
const matrices = require('../../resources/matrices.js')




const spec = {
  // special input
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

describe('mb.isSquare', function() {
  describe('accepts square(nxn) matrices', function() {
    it('accepts 1x1 square matrix', function() {
      assert.isTrue(mb.isSquare(matrices.z11))
    })
    it('accepts 3x3 square matrix', function() {
      assert.isTrue(mb.isSquare(matrices.z33))
    })
  }),
  describe('rejects non square(nxm, where n!=m) matrices', function() {
    it('rejects 1x2 matrix', function(){
      assert.isFalse(mb.isSquare(matrices.z12))
    }),
    it('rejects 2x1 matrix', function() {
      assert.isFalse(mb.isSquare(matrices.z21))
    }),
    it('rejects 3x4 matrix', function() {
      assert.isFalse(mb.isSquare(matrices.z34))
    })
  })
})

describe('mb.isIdentity', function() {
  describe('accepts identity matrices', function() {
    it('accepts size 1 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i11))
    }),
    it('accepts size 2 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i22))
    }),
    it('accepts size 3 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i33))
    })
  }),
  describe('rejects non identity matrices', function() {
    it('rejects 1x1 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z11))
    }),
    it('rejects 2x2 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z22))
    }),
    it('rejects 3x3 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z33))
    }),
    it('rejects non square matrix', function() {
      assert.isFalse(mb.isIdentity(spec.partialIdentity23))
    })
  })
})

describe('mb.sameSize', function() {
  describe('accepts matrices of same size', function() {
    it('accepts 2 1x1 matrices', function() {
      assert.isTrue(mb.sameSize(matrices.i11, matrices.z11))
    }),
    it('accepts 2 2x2 matrices', function() {
      assert.isTrue(mb.sameSize(matrices.i22, matrices.z22))
    }),
    it('accepts 2 3x4 matrices', function() {
      assert.isTrue(mb.sameSize(matrices.s34, matrices.s34))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function() {
      assert.isFalse(mb.sameSize(matrices.i11, matrices.i22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mb.sameSize(matrices.i11, matrices.z12))
    }),
    it('rejects 3x3 and 4x3 matrices', function() {
      assert.isFalse(mb.sameSize(matrices.i33, matrices.s43))
    })
  })
})
