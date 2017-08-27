const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const sameSize = require('../../src').mb.sameSize
const m = require('../../resources').matrices

describe('mb.sameSize', function() {
  describe('checks for same sized matrices', function() {
    it('accepts 2 1x1 matrices', function() {
      assert.isTrue(sameSize(m.i11, m.z11))
    }),
    it('accepts 2 2x2 matrices', function() {
      assert.isTrue(sameSize(m.i22, m.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(sameSize(m.i11, m.z12))
    })
  })
})
