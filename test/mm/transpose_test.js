const assert = require('chai').assert
const describe = require('mocha').describe
const F = require('mathjs').fraction
const it = require('mocha').it
const List = require('immutable').List
const m = require('../../resources').matrices
const transpose = require('../../src').mm.transpose
const v = require('../../resources').vectors

describe('mm.transpose', function() {
  describe('gives the transpose of a matrix', function() {
    it('can transpose a 1x1 matrix', function() {
      assert(transpose(m.i11).equals(m.i11))
    }),
    it('can transpose a 1x3 matrix', function() {
      assert(transpose(m.z13).equals(m.z31))
    }),
    it('can transpose a 3x1 matrix', function() {
      assert(transpose(m.z31).equals(m.z13))
    }),
    it('can transpose a 3x4 matrix', function() {
      const l = List([List([F(0) ,F(4), F(8)]),
                      List([F(1), F(5), F(9)]),
                      List([F(2), F(6), F(10)]),
                      List([F(3), F(7), F(11)])])
      assert(transpose(m.s34).equals(l))
    })
  })
})
