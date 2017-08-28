const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const m = require('../../resources').matrices
const mul = require('../../src').mm.mul


describe('mm.mul', function() {
  describe('gives the result of a matrix multiplied by another', function() {
    it('can mul two 1x1 matrices ([[1]]*[[5]] = [[5]])', function() {
      const m5 = List([List([F(5)])])
      const l = List([List([F(5)])])
      assert(mul(m.o11, m5).equals(l))
    }),
    it('can mul a 3x1 with a 1x3 matrix (m.s13 * m.s31)', function() {
      const l = List([List([F(5)])])
      assert(mul(m.s13, m.s31).equals(l))
    }),
    it('can mul a 1x3 matrix with a 3x1 matrix (m.s31 * m.s13)', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(2), F(4)])])
      assert(mul(m.s31, m.s13).equals(l))
    }),
    it('can mul a 3x4 matrix  with a 4x3 matrix (m.s34 * m.s43)', function() {
      const l = List([List([F(42), F(48), F(54)]),
                      List([F(114), F(136), F(158)]),
                      List([F(186), F(224), F(262)])])
      assert(mul(m.s34, m.s43).equals(l))
    }),
    it('can mul a 4x3 matrix with a 3x4 amtrix (m.s43 * m.s34)', function() {
      const l = List([List([F(20), F(23), F(26), F(29)]),
                      List([F(56), F(68), F(80), F(92)]),
                      List([F(92), F(113), F(134), F(155)]),
                      List([F(128), F(158), F(188), F(218)])])
      assert(mul(m.s43, m.s34).equals(l))
    })
  })
})
