const assert = require('chai').assert
const add = require('../../src').vv.add
const describe = require('mocha').describe
const it = require('mocha').it
const List = require('immutable').List
const v = require('../../resources').vectors
const F = require('mathjs').fraction

describe('vv.add', function() {
  describe('gives the sum of two same sized vectors', function() {
    it('can add two size 1 vectors (v.o1 + v.o1)', function() {
      const l = List([F(2)])
      assert(add(v.o1, v.o1).equals(l))
    }),
    it('can add two size 2 vectors (v.o2 + v.o2)', function() {
      const l = List([F(2), F(2)])
      assert(add(v.o2, v.o2).equals(l))
    })
  })
})
