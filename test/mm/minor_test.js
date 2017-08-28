const assert = require('chai').assert
const minor = require('../../src').mm.minor
const m = require('../../resources').matrices
const F = require('mathjs').fraction
const List = require('immutable').List

describe('mm.minor', function() {
  describe('gives the minor of a matrix with the rth row and cth column removed', function() {
    it('can remove the 1th row and 1th column from an identity matrix', function() {
      const l = List([List([F(1), F(0)]),
                      List([F(0), F(1)])])
      assert(minor(m.i33, 1, 1).equals(l))
    })
  })
})
