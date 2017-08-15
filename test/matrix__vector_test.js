const mv = require('../src/matrix__vector.js')
const matrices = require('./resources/matrices.js').matrices
const vecEq = require('./resources/vectorEquals.js').vectorEquals

const assert = require('chai').assert

const describe = require('mocha').describe
const it = require('mocha').it

describe('column', function() {
  describe('returns a vector representation of the 0th column of i33', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(vecEq(mv.column(matrices.i33, 0), [1, 0, 0]))
    })
  }),
  describe('returns a vector representation of the 1th column of i33', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(vecEq(mv.column(matrices.i33, 1), [0, 1, 0]))
    })
  }),
  describe('returns a vector representation of the 2th column of i33', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(vecEq(mv.column(matrices.i33, 2), [0, 0, 1]))
    })
  })
})

describe('row', function() {
  describe('returns a vector representation of the 0th row of i33', function() {
    it('resolves to [1, 0, 0], given m = i33, n = 0', function() {
      assert(vecEq(mv.row(matrices.i33, 0), [1, 0, 0]))
    })
  }),
  describe('returns a vector representation of the 1th row of i33', function() {
    it('resolves to [0, 1, 0], given m = i33, n = 1', function() {
      assert(vecEq(mv.row(matrices.i33, 1), [0, 1, 0]))
    })
  }),
  describe('returns a vector representation of the 2th row of i33', function() {
    it('resolves to [0, 0, 1], given m = i33, n = 2', function() {
      assert(vecEq(mv.row(matrices.i33, 2), [0, 0, 1]))
    })
  })
})