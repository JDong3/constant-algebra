const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const isSquare = require('../../src').mb.isSquare
const matrices = require('../../resources').matrices

describe('mb.isSquare', function() {
  describe('checks for square matrix', function() {
    it('accepts 1x1 square matrix', function() {
      assert.isTrue(isSquare(matrices.i11))
    }),
    it('accepts 2x2 square matrix', function() {
      assert.isTrue(isSquare(matrices.z22))
    }),
    it('rejects 1x2 non square matrix', function() {
      assert.isFalse(isSquare(matrices.z12))
    }),
    it('rejects 4x3 non square matrix', function() {
      assert.isFalse(isSquare(matrices.s34))
    })
  })
})
