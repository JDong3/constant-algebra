const assert = require('chai').assert
const cofactors = require('../../src').mm.cofactors
const m = require('../../resources').matrices
const List = require('immutable').List
const F = require('mathjs').fraction
const describe = require('mocha').describe
const it = require('mocha').it


describe('mm.cofactors', function() {
  describe('gives the cofactor matrix of a matrix', function() {
    it('can cofactorize s33', function() {
      const l = List([List([F(0), F(6), F(-6)]),
                      List([F(18), F(48), F(-30)]),
                      List([F(-18), F(-42), F(-24)])])
      //assert(cofactors(m.s33).equals(l))
    })
  })
})
