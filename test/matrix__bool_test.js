const mb = require('../src/matrix__bool.js')
const chai = require('chai')
const describe = require('mocha').describe
const it = require('mocha').it
let assert = chai.assert

describe('Verify', function() {
  describe('accepts rectangularity', function() {
    it('accepts 1x1 small square', function() {
      m = [[0]]
      assert.isTrue(mb.verify(m), 'a 1x1 square is a rectangle')
    }),
    it('accepts 2x2 larger square', function() {
      m = [[0, 0],
           [0, 0]]
      assert.isTrue(mb.verify(m), 'a 2x2 square is a rectangle')
    }),
    it('accepts 3x3 largerer square', function() {
      m = [[0, 0, 0],
           [0, 0, 0],
           [0, 0, 0]]
      assert.isTrue(mb.verify(m))
    }),
    it('accepts 3x2 rectangle', function() {
      m = [[0, 0],
           [0, 0],
           [0, 0]]
      assert.isTrue(mb.verify(m))
    }),
    it('accepts 2x3 rectangle', function() {
      m = [[0, 0, 0],
           [0, 0, 0]]
      assert.isTrue(mb.verify(m))
    })
  }),
  describe('rejects non-rectangularity', function() {
    it('rejects different size rows', function() {
      m = [[0, 0, 0],
           [0, 0]]
      assert.isFalse(mb.verify(m))
    })
  })
  describe('accepts array of array', function() {
    it('accepts base case', function() {
      m = [[0]]
      assert.isTrue(mb.verify(m))
    })
  })
  describe('rejects array of not array', function() {
    it('rejects array of int', function() {
      m = [0, 0, 0]
      assert.isFalse(mb.verify(m))
    }),
    it('rejects array of mostly arrays but one int', function() {
      m = [[0, 0, 0],
           0,
           [0, 0, 0]]
      assert.isFalse(mb.verify(m))
    })
  })
  describe("rejects size 0", function() {
    it('rejects empty case', function() {
      m = [[]]
    }),
    it('rejects width of 0', function() {
      m = [[],
           [],
           []]
      assert.isFalse(mb.verify(m))
    })
  })
})

describe('isSquare', function() {
  describe('accepts square(nxn) matrices', function() {
    it('accepts 1x1 square matrix', function() {
      m = [[0]]
      assert.isTrue(mb.isSquare(m))
    })
    it('accepts 3x3 square matrix', function() {
      m = [[0, 0, 0],
           [0, 0, 0],
           [0, 0, 0]]
      assert.isTrue(mb.isSquare(m))
    })
  }),
  describe('rejects non square(nxm, where n!=m) matrices', function() {
    it('rejects 1x2 matrix', function(){
      m = [[0, 1]]
      assert.isFalse(mb.isSquare(m))
    }),
    it('rejects 2x1 matrix', function() {
      m = [[0],
           [1]]
      assert.isFalse(mb.isSquare(m))
    }),
    it('rejects 3x4 matrix', function() {
      m = [[0, 1, 2, 3],
           [0, 1, 2, 3],
           [0, 1, 2, 3]]
      assert.isFalse(mb.isSquare(m))
    })
  })
})

describe('isIdentity', function() {
  describe('accepts identity matrices', function() {
    it('accepts size 1 identity', function() {
      m = [[1]]
      assert.isTrue(mb.isIdentity(m))
    }),
    it('accepts size 2 identity', function() {
      m = [[1, 0],
           [0, 1]]
      assert.isTrue(mb.isIdentity(m))
    }),
    it('accepts size 3 identity', function() {
      m = [[1, 0, 0],
           [0, 1, 0],
           [0, 0, 1]]
      assert.isTrue(mb.isIdentity(m))
    })
  }),
  describe('rejects non identity matrices', function() {
    it('rejects 1x1 0 matrix', function() {
      m = [[0]]
      assert.isFalse(mb.isIdentity(m))
    }),
    it('rejects 2x2 0 matrix', function() {
      m = [[0, 0],
           [0, 0]]
      assert.isFalse(mb.isIdentity(m))
    }),
    it('rejects 3x3 0 matrix', function() {
      m = [[0]]
      assert.isFalse(mb.isIdentity(m))
    })
  })
})






















































