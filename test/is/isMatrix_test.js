const assert = require('chai').assert
const F = require('mathjs').fraction
const isMatrix = require('../../src').is.isMatrix
const List = require('immutable').List
const matrices = require('../../resources').matrices
const vectors = require('../../resources').vectors

describe('is.isMatirx', function() {
  describe('checks for List of vector', function() {
    it('accepts List of vector', function() {
      const l = List([vectors.o3,
                      vectors.o3,
                      vectors.o3])
      assert.isTrue(isMatrix(l))
    }),
    it('rejects List of Array', function() {
      const l = List([[1, 2, 3],
                      [1, 2, 3]])
      assert.isFalse(isMatrix(l))
    }),
    it('rejects Array of vector', function() {
      const l = [vectors.o3,
                 vectors.o3,
                 vectors.o3]
      assert.isFalse(isMatrix(l))
    })
  }),
  describe('checks for List of same sized vector', function() {
    it('accepts List of two size 3 vectors', function() {
      const l = List([vectors.o3,
                      vectors.o3])
      assert.isTrue(isMatrix(l))
    }),
    it('rejects List of size 2 and size 3 vectors', function() {
      const l = List([vectors.o2,
                      vectors.o3])
      assert.isFalse(isMatrix(l))
    })
  })
})
