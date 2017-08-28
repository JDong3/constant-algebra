const assert = require('chai').assert
const m = require('../../resources').matrices
const det = require('../../src').mn.det
const F = require('mathjs').fraction

describe('mn.det', function() {
  describe('gives the determinant of a square matrix', function() {
    it('gives the determinant of a 1x1 matrix (m.i11)', function() {
      assert(det(m.i11).equals(F(1)))
    }),
    it('gives the determinant of a 2x2 matrix (m.s22)', function() {
      assert(det(m.s22).equals(F(-2)))
    })
  })
})
