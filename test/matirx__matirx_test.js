const assert = require('chai').assert
const List = require('immutable').List
const matrices = require('./matrices.js')
const mm = require('../src/matrix__matrix.js')

describe('mm.transpose', function() {
  describe('applies matrix transpose', function() {
    it('can transpose a 1x1 matrix into itself', function() {
      assert(mm.transpose(matrices.z11).equals(matrices.z11))
    }),
    it('can transpose an identity matrix into itself', function() {
      assert(mm.transpose(matrices.i33).equals(matrices.i33))
    }),
    it('can transpose an arbitrary nxm matrix', function() {
      const l = List([ List([0, 4, 8]),
                       List([1, 5, 9]),
                       List([2, 6, 10]),
                       List([3, 7, 11]) ])

      assert(mm.transpose(matrices.s34).equals(l))
    })
  })
})

describe('mm.add', function() {
  describe('computes matrix addition', function() {
    it('can add two 1x1 matrices', function() {
      const l = List([ List([2]) ])
      assert(mm.add(matrices.o11, matrices.o11).equals(l))
    }),
    it('can add two 1x1 matrices', function() {
      const l = List([ List([1]) ])
      assert(mm.add(matrices.z11, matrices.o11).equals(l))
    }),
    it('can add two nxm matrices', function() {
      const l = List([ List([0, 2, 4, 6]),
                       List([8, 10, 12, 14]),
                       List([16, 18, 20, 22]) ])
      assert(mm.add(matrices.s34, matrices.s34).equals(l))
    })
  })
})

describe('mm.sub', function() {
  describe('computes matrix subtraction', function() {
    it('can add two 1x1 matrices', function() {
      const l = List([ List([0]) ])
      assert(mm.sub(matrices.o11, matrices.o11).equals(l))
    }),
    it('can add two 1x1 matrices', function() {
      const l = List([ List([-1]) ])
      assert(mm.sub(matrices.z11, matrices.o11).equals(l))
    }),
    it('can add two nxm matrices', function() {
      const l = List([ List([0, 0, 0, 0]),
                       List([0, 0, 0, 0]),
                       List([0, 0, 0, 0]) ])
      assert(mm.sub(matrices.s34, matrices.s34).equals(l))
    })
  })
})
