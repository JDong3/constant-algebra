const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const v = require('../../resources').vectors
const F = require('mathjs').fraction
const List = require('immutable').List
const scale = require('../../src').vv.scale

describe('vv.scale', function() {
  describe('gives the scalar product of a matrix and a fraction', function () {
    it('can scale a length 1 vector (2*v.o1)', function() {
      const l = List([F(2)])
      assert(scale(v.o1, 2).equals(l))
    }),
    it('can scale a length 2 vector (2*v.o2)', function() {
      const l = List([F(2), F(2)])
      assert(scale(v.o2, 2).equals(l))
    })
  })
})
