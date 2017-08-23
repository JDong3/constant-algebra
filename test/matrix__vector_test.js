const assert = require('chai').assert
const describe = require('mocha').describe
const F = require('mathjs').fraction
const it = require('mocha').it
const List = require('immutable').List
const matrices = require('./matrices.js')
const mv = require('../src/matrix__vector.js')

describe('mv.row', function() {
  describe('returns a vector representation of the 0th row of m', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(mv.row(matrices.i33, 0).equals(List([F(1), F(0), F(0)])))
    })
  }),
  describe('returns a vector representation of the 1th row of m', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(mv.row(matrices.i33, 1).equals(List([F(0), F(1), F(0)])))
    })
  }),
  describe('returns a vector representation of the 2th row of m', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(mv.row(matrices.i33, 2).equals(List([F(0), F(0), F(1)])))
    })
  })
})

describe('mv.column', function() {
  describe('returns a vector representation of the 0th column of m', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(mv.column(matrices.i33, 0).equals(List([1, F(0), F(0)])))
    })
  }),
  describe('returns a vector representation of the 1th column of m', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(mv.column(matrices.i33, 1).equals(List([F(0), F(1), F(0)])))
    })
  }),
  describe('returns a vector representation of the 2th column of m', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(mv.column(matrices.i33, 2).equals(List([F(0), F(0), F(1)])))
    })
  })
})

describe('mv.diagonal', function() {
  describe('returns a vector representation of the diagonal of m', function() {
    it('resolves to [0, 4, 8], given m = s33', function() {
      assert(mv.diagonal(matrices.s33).equals(List([F(0), F(4), F(8)])))
    })
  })
})

describe('mv.looseDiagonal', function () {
  describe('returns a vector representation of the loose diagonal of m', function(){
    it('resolves to [0, 4, 8], given s = s33', function() {
      assert(mv.looseDiagonal(matrices.s33).equals(List([F(0), F(4), F(8)])))
    }),
    it('resolves to [0, 5, 10], given s = s34', function() {
      assert(mv.looseDiagonal(matrices.s34).equals(List([F(0), F(5), F(10)])))
    }),
    it('resolves to [0, 4, 8], given s = s43', function() {
      assert(mv.looseDiagonal(matrices.s43).equals(List([F(0), F(4), F(8)])))
    })
  })
})
