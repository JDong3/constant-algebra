const assert = require('chai').assert
const mmv = require('../../src/verification/matrix__matrix_verif.js')
const matrices = require('../../resources/matrices.js')

describe('mmv.addDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      assert.isTrue(mmv.addDefined(matrices.z11, matrices.z11))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      assert.isTrue(mmv.addDefined(matrices.z33, matrices.z33))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      assert.isTrue(mmv.addDefined(matrices.z23, matrices.z23))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      assert.isFalse(mmv.addDefined(matrices.z11, matrices.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mmv.addDefined(matrices.z11, matrices.z12))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      assert.isFalse(mmv.addDefined(matrices.z11, matrices.z21))
    })
  })
})

describe('mmv.subDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      assert.isTrue(mmv.subDefined(matrices.z11, matrices.z11))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      assert.isTrue(mmv.subDefined(matrices.z33, matrices.z33))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      assert.isTrue(mmv.subDefined(matrices.z23, matrices.z23))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      assert.isFalse(mmv.subDefined(matrices.z11, matrices.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mmv.subDefined(matrices.z11, matrices.z12))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      assert.isFalse(mmv.subDefined(matrices.z11, matrices.z21))
    })
  })
})
