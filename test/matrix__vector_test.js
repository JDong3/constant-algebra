const mv = require('../src/matrix__vector.js')
const matrices = require('./resources/matrices.js').matrices
const vecEq = require('./resources/vectorEquals.js').vectorEquals

const assert = require('chai').assert

const describe = require('mocha').describe
const it = require('mocha').it

describe('column', function() {
  describe('returns a vector representation of the 0th column of m', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(vecEq(mv.column(matrices.i33, 0), [1, 0, 0]))
    })
  }),
  describe('returns a vector representation of the 1th column of m', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(vecEq(mv.column(matrices.i33, 1), [0, 1, 0]))
    })
  }),
  describe('returns a vector representation of the 2th column of m', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(vecEq(mv.column(matrices.i33, 2), [0, 0, 1]))
    })
  })
})

describe('row', function() {
  describe('returns a vector representation of the 0th row of m', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(vecEq(mv.row(matrices.i33, 0), [1, 0, 0]))
    })
  }),
  describe('returns a vector representation of the 1th row of m', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(vecEq(mv.row(matrices.i33, 1), [0, 1, 0]))
    })
  }),
  describe('returns a vector representation of the 2th row of m', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(vecEq(mv.row(matrices.i33, 2), [0, 0, 1]))
    })
  })
})

describe('diagonal', function() {
  describe('returns a vector representation of the diagonal of m', function() {
    it('resolves to [0, 4, 8], given m = s33', function() {
      assert(vecEq(mv.diagonal(matrices.s33), [0, 4, 8]))
    })
  })
})

describe('looseDiagonal', function () {
  describe('returns a vector representation of the loose diagonal of m', function() {
    it('resolves to [0, 4, 8], given s = s33', function() {
      assert(vecEq(mv.looseDiagonal(matrices.s33), [0, 4, 8]))
    }),
    it('resolves to [0, 5, 10], given s = s34', function() {
      assert(vecEq(mv.looseDiagonal(matrices.s34), [0, 5, 10]))
    }),
    it('resolves to [0, 4, 8], given s = s43', function() {
      assert(vecEq(mv.looseDiagonal(matrices.s43), [0, 4, 8]))
    })
  })
})














