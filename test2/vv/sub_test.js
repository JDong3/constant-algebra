const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const sub = require('../../src').vv.sub
const v = require('../../resources').vectors

describe('vv.sub', function() {
  describe('gives the difference of two same sized vectors', function () {
    it('can diff two size 1 vectors (v.o1 - v.o1)', function () {
      assert(sub(v.o1, v.o1).equals(v.z1))
    }),
    it('can diff two size 2 vectors (v.o2 - v.o2)', function () {
      assert(sub(v.o2, v.o2).equals(v.z2))
    })
})
})
