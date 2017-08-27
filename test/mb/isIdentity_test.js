const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const isIdentity = require('../../src').mb.isIdentity
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction

describe('mb.isIdentity', function() {
  describe('checks for identity matrix', function() {
    it('accepts 1x1 identity matrix', function() {
      assert.isTrue(isIdentity(m.i11))
    }),
    it('accepts 2x2 identity matrix', function() {
      assert.isTrue(isIdentity(m.i22))
    }),
    it('accepts 3x3 identity matrix', function() {
      assert.isTrue(isIdentity(m.i33))
    }),
    it('rejects 3x4 matrix', function() {
      assert.isFalse(isIdentity(m.s34))
    }),
    it('rejects almost 3x3 identity matrix', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert.isFalse(isIdentity(l))
    })
  })
})
