const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const v = require('../../resources').vectors
const F = require('mathjs').fraction
const List = require('immutable').List
const dot = require('../../src').vn.dot

describe('vn.dot', function() {
  describe('gives the dot product of two same sized vectors', function() {
    it('can dot two length 1 vectors (v.o1 * v.z1)', function() {
      const k = F(0)
      assert(dot(v.o1, v.z1).equals(k))
    }),
    it('can dot two length 1 vectors (v.o1 * v.o1)', function() {
      const k = F(1)
      assert(dot(v.o1, v.o1).equals(k))
    }),
    it('can dot two length 3 vectors (v.s3 * v.s3)', function() {
      const k = F(5)
      assert(dot(v.s3, v.s3).equals(k))
    })
  })
})
