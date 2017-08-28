const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const matrices = require('../../resources/matrices.js')
const mm = require('../../src/operation/matrix__matrix.js')


describe('mm.mul', function() {
  describe('can multiply 1x1 and 1x1 matrices', function() {
    it('[[1]]*[[5]] = [[5]]', function() {
      const m5 = List([List([F(5)])])
      const l = List([List([F(5)])])
      assert(mm.mul(matrices.o11, m5).equals(l))
    })
  }),
  describe('can multiply 3x1 and 1x3 matrices', function() {
    it('1x3 * 3x1', function() {
      const l = List([List([F(5)])])
      assert(mm.mul(matrices.s13, matrices.s31).equals(l))
    }),
    it('1x3 * 3x1', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(2), F(4)])])
      assert(mm.mul(matrices.s31, matrices.s13).equals(l))
    })
  }),
  describe('can multiply 3x4 and 4x3 matrices', function() {
    it('3x4 * 4x3', function() {
      const l = List([List([F(42), F(48), F(54)]),
                      List([F(114), F(136), F(158)]),
                      List([F(186), F(224), F(262)])])
      assert(mm.mul(matrices.s34, matrices.s43).equals(l))
    }),
    it('4x3 * 3x4', function() {
      const l = List([List([F(20), F(23), F(26), F(29)]),
                      List([F(56), F(68), F(80), F(92)]),
                      List([F(92), F(113), F(134), F(155)]),
                      List([F(128), F(158), F(188), F(218)])])
      assert(mm.mul(matrices.s43, matrices.s34).equals(l))
    })
  })
})


describe('mm.rref', function() {
  describe('rrefifies a matrix', function() {
    it('1x1 identity', function() {
      assert(mm.rref(matrices.i11).equals(matrices.i11))
    }),
    it('2x2 identity', function() {
      assert(mm.rref(matrices.i22).equals(matrices.i22))
    }),
    it('3x3 identity', function() {
      assert(mm.rref(matrices.i33).equals(matrices.i33))
    }),
    it('s33', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)])])
      assert(mm.rref(matrices.s33).equals(l))
    }),
    it('s34', function() {
      const l = List([List([F(1), F(0), F(-1), F(-2)]),
                      List([F(0), F(1), F(2), F(3)]),
                      List([F(0), F(0), F(0), F(0)])])
      assert(mm.rref(matrices.s34).equals(l))
    }),
    it('s43', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(mm.rref(matrices.s43).equals(l))
    }),
    it('o33:', function() {
      const l = List([List([F(1), F(1), F(1)]),
                     List([F(0), F(0), F(0)]),
                     List([F(0), F(0), F(0)])])
      assert(mm.rref(matrices.o33).equals(l))
    })
  })
})

describe('mm.minor', function() {
  describe('gives the minor of a matrix with the rth row and cth column removed', function() {
    it('can remove the 1th row and 1th column from an identity matrix', function() {
      const l = List([List([F(1), F(0)]),
                      List([F(0), F(1)])])
      assert(mm.minor(matrices.i33, 1, 1).equals(l))
    })
  })
})

describe('mm.cofactors', function() {
  describe('gives the cofactor matrix of the input', function() {
    it('can cofactorize s33', function() {
      const l = List([List([F(0), F(6), F(-6)]),
                      List([F(18), F(48), F(-30)]),
                      List([F(-18), F(-42), F(-24)])])
      assert(mm.cofactors(matrices.s33).equals(l))
    })
  })
})
