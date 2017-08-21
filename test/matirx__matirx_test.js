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
