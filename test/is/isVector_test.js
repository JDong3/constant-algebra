const assert = require('chai').assert
const describe = require('mocha').describe
const F = require('mathjs').fraction
const it = require('mocha').it
const isVector = require('../../src').is.isVector
const List = require('immutable').List
const vectors = require('../../resources').vectors

describe('is.isVector', function() {
  describe('checks for list of F', function() {
    it('accepts list of F', function() {
      assert.isTrue(isVector(vectors.o3))
    }),
    it('rejects array of F', function() {
      const l = [F(0)]
      assert.isFalse(isVector(l))
    }),
    it('rejects list of Number', function() {
      const l = List([1, 2, 3])
      assert.isFalse(isVector(l))
    })
  }),
  describe('checks size', function() {
    it('accepts size 1 list of F', function() {
      assert.isTrue(isVector(vectors.o1))
    }),
    it('rejects size 0 list', function() {
      assert.isFalse(isVector(List([])))
    })
  })
})
