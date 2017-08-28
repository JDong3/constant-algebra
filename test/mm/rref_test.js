const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const m = require('../../resources').matrices
const describe = require('mocha').describe
const it = require('mocha').it
const rref = require('../../src').mm.rref

describe('mm.rref', function() {
  describe('gives the row reduced echelon form of a matrix', function() {
    it('can reffify a 1x1 matrix (m.i11)', function() {
      assert(rref(m.i11).equals(m.i11))
    }),
    it('can reffify a 2x2 matrix (m.i22)', function() {
      assert(rref(m.i22).equals(m.i22))
    }),
    it('can reffify a 3x3 matrix (m.i33)', function() {
      assert(rref(m.i33).equals(m.i33))
    }),
    it('can reffify a harder 3x3 matrix (m.s33)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)])])
      assert(rref(m.s33).equals(l))
    }),
    it('can reffify a 3x4 matrix (m.s34)', function() {
      const l = List([List([F(1), F(0), F(-1), F(-2)]),
                      List([F(0), F(1), F(2), F(3)]),
                      List([F(0), F(0), F(0), F(0)])])
      assert(rref(m.s34).equals(l))
    }),
    it('can reffify a 4x3 matrix (m.s43)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(rref(m.s43).equals(l))
    }),
    it('can reffify a 3x3 matrix (m.o33)', function() {
      const l = List([List([F(1), F(1), F(1)]),
                     List([F(0), F(0), F(0)]),
                     List([F(0), F(0), F(0)])])
      assert(rref(m.o33).equals(l))
    })
  })
})
