const assert = require('chai').assert
const matrices = require('../../resources/matrices.js')
const mvv = require('../../src/verification/matrix__vector_verif.js')


describe('mvv.rowDefined accepts rows int r in {0..n-1}, for a nxa matrix', function() {
  describe('accepts rows in {0} for a 1x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mvv.rowDefined(matrices.z11, 0))
    })
  }),
  describe('rejects rows in Z\\{0} for a 1x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mvv.rowDefined(matrices.z11, -1))
    }),
    it('rejects 1', function() {
      assert.isFalse(mvv.rowDefined(matrices.z11, 1))
    })
  })
  describe('accepts rows in {0, 1, 2} for a 3x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mvv.rowDefined(matrices.z31, 0))
    }),
    it('accepts 1', function() {
      assert.isTrue(mvv.rowDefined(matrices.z31, 1))
    }),
    it('accepts 2', function() {
      assert.isTrue(mvv.rowDefined(matrices.z31, 2))
    })
  }),
  describe('rejects rows Z\\{0, 1, 2} for a 3x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mvv.rowDefined(matrices.z31, -1))
    }),
    it('rejects 3', function() {
      assert.isFalse(mvv.rowDefined(matrices.z31, 3))
    })
  })
})

describe('mvv.columnDefined accepts rows int r in {0..n-1}, for a nxa matrix', function() {
  describe('accepts columns in {0} for a 1x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mvv.columnDefined(matrices.z11, 0))
    })
  }),
  describe('rejects columns Z\\{0} for a 1x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mvv.columnDefined(matrices.z11, -1))
    }),
    it('rejects 1', function() {
      assert.isFalse(mvv.columnDefined(matrices.z11, -1))
    })
  }),
  describe('accepts columns in {0, 1, 2} for a 1x3 matrix', function () {
    it('accepts 0', function () {
      assert.isTrue(mvv.columnDefined(matrices.z13, 0))
    }),
    it('accepts 1', function () {
      assert.isTrue(mvv.columnDefined(matrices.z13, 1))
    }),
    it('accepts 2', function () {
      assert.isTrue(mvv.columnDefined(matrices.z13, 2))
    })
  }),
  describe('rejects columns Z\\{0, 1, 2} for a 1x3 matrix', function () {
    it('rejects -1', function () {
      assert.isFalse(mvv.columnDefined(matrices.z13, -1))
    }),
    it('rejects 3', function () {
      assert.isFalse(mvv.columnDefined(matrices.z13, 3))
    })
  })
})
