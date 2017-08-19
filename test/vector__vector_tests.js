const assert = require('chai').assert

const describe = require('mocha').describe
const it = require('mocha').it

const vv = require('../src/vector__vector.js')
const vecEq = require('./resources/vectorEquals.js').vectorEquals
const vectors = require('./resources/vectors.js').vectors

describe('add', function() {
  describe('it performs mathematical vector addition on two vectors (v1, v2)', function() {
    it('gives [0], given v1 = [0] and v2 [0]', function () {
      console.log(vectors.z1)
      assert.isTrue(vecEq(vv.add(vectors.z1, vectors.z1), [0]))
    })
  })
})
