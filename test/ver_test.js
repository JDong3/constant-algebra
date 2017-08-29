const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const top = require('..')
const m = top.matrices
const v = top.vectors
const is = top.is

describe('is.isMatirx', function() {
  describe('checks for List of vector', function() {
    it('accepts List of vector', function() {
      const l = List([v.o3,
                      v.o3,
                      v.o3])
      assert.isTrue(is.isMatrix(l))
    }),
    it('rejects List of Array', function() {
      const l = List([[1, 2, 3],
                      [1, 2, 3]])
      assert.isFalse(is.isMatrix(l))
    }),
    it('rejects Array of vector', function() {
      const l = [v.o3,
                 v.o3,
                 v.o3]
      assert.isFalse(is.isMatrix(l))
    })
  }),
  describe('checks for List of same sized vector', function() {
    it('accepts List of two size 3 v', function() {
      const l = List([v.o3,
                      v.o3])
      assert.isTrue(is.isMatrix(l))
    }),
    it('rejects List of size 2 and size 3 v', function() {
      const l = List([v.o2,
                      v.o3])
      assert.isFalse(is.isMatrix(l))
    })
  })
})

describe('is.isVector', function() {
  describe('checks for list of F', function() {
    it('accepts list of F', function() {
      assert.isTrue(is.isVector(v.o3))
    }),
    it('rejects array of F', function() {
      const l = [F(0)]
      assert.isFalse(is.isVector(l))
    }),
    it('rejects list of Number', function() {
      const l = List([1, 2, 3])
      assert.isFalse(is.isVector(l))
    })
  }),
  describe('checks size', function() {
    it('accepts size 1 list of F', function() {
      assert.isTrue(is.isVector(v.o1))
    }),
    it('rejects size 0 list', function() {
      assert.isFalse(is.isVector(List([])))
    })
  })
})
