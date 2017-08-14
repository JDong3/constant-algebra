const mb = require('../src/matrix__bool.js')
const chai = require('chai')
const describe = require('mocha').describe
const it = require('mocha').it
let assert = chai.assert

describe('Verify', function() {
  describe('accepts rectangularity', function() {
    it('accepts 1x1 small square', function() {
      let m = [[0]]
      assert.isTrue(mb.verify(m), 'a 1x1 square is a rectangle')
    }),
    it('accepts 2x2 larger square', function() {
      let m = [[0, 0],
              [0, 0]]
      assert.isTrue(mb.verify(m), 'a 2x2 square is a rectangle')
    }),
    it('accepts 3x3 largerer square', function() {
      let m = [[0, 0, 0],
               [0, 0, 0],
               [0, 0, 0]]
      assert.isTrue(mb.verify(m))
    }),
    it('accepts 3x2 rectangle', function() {
      let m = [[0, 0],
               [0, 0],
               [0, 0]]
      assert.isTrue(mb.verify(m))
    }),
    it('accepts 2x3 rectangle', function() {
      let m = [[0, 0, 0],
               [0, 0, 0]]
      assert.isTrue(mb.verify(m))
    })
  }),
  describe('rejects non-rectangularity', function() {
    it('rejects different size rows', function() {
      let m = [[0, 0, 0],
               [0, 0]]
      assert.isFalse(mb.verify(m))
    })
  })
  describe('accepts array of array', function() {
    it('accepts base case', function() {
      let m = [[0]]
      assert.isTrue(mb.verify(m))
    })
  })
  describe('rejects array of not array', function() {
    it('rejects array of int', function() {
      let m = [0, 0, 0]
      assert.isFalse(mb.verify(m))
    }),
    it('rejects array of mostly arrays but one int', function() {
      let m = [[0, 0, 0],
               0,
               [0, 0, 0]]
      assert.isFalse(mb.verify(m))
    })
  })
  describe("rejects size 0", function() {
    it('rejects empty case', function() {
      let m = [[]]
    }),
    it('rejects width of 0', function() {
      let m = [[],
               [],
               []]
      assert.isFalse(mb.verify(m))
    })
  })
})

describe('isSquare', function() {
  describe('accepts square(nxn) matrices', function() {
    it('accepts 1x1 square matrix', function() {
      let m = [[0]]
      assert.isTrue(mb.isSquare(m))
    })
    it('accepts 3x3 square matrix', function() {
      let m = [[0, 0, 0],
               [0, 0, 0],
               [0, 0, 0]]
      assert.isTrue(mb.isSquare(m))
    })
  }),
  describe('rejects non square(nxm, where n!=m) matrices', function() {
    it('rejects 1x2 matrix', function(){
      let m = [[0, 1]]
      assert.isFalse(mb.isSquare(m))
    }),
    it('rejects 2x1 matrix', function() {
      let m = [[0],
               [1]]
      assert.isFalse(mb.isSquare(m))
    }),
    it('rejects 3x4 matrix', function() {
      let m = [[0, 1, 2, 3],
               [0, 1, 2, 3],
               [0, 1, 2, 3]]
      assert.isFalse(mb.isSquare(m))
    })
  })
})

describe('isIdentity', function() {
  describe('accepts identity matrices', function() {
    it('accepts size 1 identity', function() {
      let m = [[1]]
      assert.isTrue(mb.isIdentity(m))
    }),
    it('accepts size 2 identity', function() {
      let m = [[1, 0],
               [0, 1]]
      assert.isTrue(mb.isIdentity(m))
    }),
    it('accepts size 3 identity', function() {
      let m = [[1, 0, 0],
               [0, 1, 0],
               [0, 0, 1]]
      assert.isTrue(mb.isIdentity(m))
    })
  }),
  describe('rejects non identity matrices', function() {
    it('rejects 1x1 0 matrix', function() {
      let m = [[0]]
      assert.isFalse(mb.isIdentity(m))
    }),
    it('rejects 2x2 0 matrix', function() {
      let m = [[0, 0],
               [0, 0]]
      assert.isFalse(mb.isIdentity(m))
    }),
    it('rejects 3x3 almost identity', function() {
      let m = [[1, 0, 0],
               [0, 1, 0],
               [0, 0, 0]]
      assert.isFalse(mb.isIdentity(m))
    }),
    it('rejects non square matrix', function() {
      let m = [[1, 0, 0],
               [0, 1, 0]]
      assert.isFalse(mb.isIdentity(m))
    })
  })
})


describe('addDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0]]
      assert.isTrue(mb.addDefined(m1, m2))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      let m1 = [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]]
      let m2 = [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]]
      assert.isTrue(mb.addDefined(m1, m2))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      let m1 = [[0, 0, 0],
                [0, 0, 0]]
      let m2 = [[0, 0, 0],
                [0, 0, 0]]
      assert.isTrue(mb.addDefined(m1, m2))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      let m1 = [[0]]
      let m2 = [[0, 0],
                [0, 0]]
      assert.isFalse(mb.addDefined(m1, m2))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0, 0]]
      assert.isFalse(mb.addDefined(m1, m2))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0],
                [0]]
      assert.isFalse(mb.addDefined(m1, m2))
    })
  })
})

describe('subDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0]]
      assert.isTrue(mb.addDefined(m1, m2))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      let m1 = [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]]
      let m2 = [[0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]]
      assert.isTrue(mb.addDefined(m1, m2))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      let m1 = [[0, 0, 0],
                [0, 0, 0]]
      let m2 = [[0, 0, 0],
                [0, 0, 0]]
      assert.isTrue(mb.addDefined(m1, m2))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      let m1 = [[0]]
      let m2 = [[0, 0],
                [0, 0]]
      assert.isFalse(mb.addDefined(m1, m2))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0, 0]]
      assert.isFalse(mb.addDefined(m1, m2))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      let m1 = [[0]]
      let m2 = [[0],
                [0]]
      assert.isFalse(mb.addDefined(m1, m2))
    })
  })
})

describe('rowValid accepts rows int r in {0..n-1}, for a nxa matrix', function() {
  describe('accepts rows r in {0}, for a 1x1 matrix', function() {
    it('accepts 0', function() {
      let m = [[0]]
      assert.isTrue(mb.rowValid(m, 0))
    })
  }),
  describe('rejects rows r in I\\{0}, for a 1x1 matrix', function() {
    it('rejects -1', function() {
      let m = [[0]]
      assert.isFalse(mb.rowValid(m, -1))
    }),
    it('rejects 1', function() {
      let m = [[0]]
      assert.isFalse(mb.rowValid(m, 1))
    })
    
  })
})



















































