const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const sameSize = require('../../src').vb.sameSize
const v = require('../../resources').vectors

describe('vb.sameSize', function() {
  describe('checks for same sized vectors', function() {
    it('accepts two size 1 vectors', function() {
      assert.isTrue(sameSize(v.o1, v.o1))
    }),
    it('accepts two size 2 vectors', function() {
      assert.isTrue(sameSize(v.o2, v.z2))
    }),
    it('rejects size 1 and size 2 vectors', function() {
      assert.isFalse(sameSize(v.o2, v.o1))
    })
  })
})
