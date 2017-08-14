const mb = require('../src/matrix__bool.js')
const chai = require('chai')
const describe = require('mocha').describe
const it = require('mocha').it
let assert = chai.assert

let matrices = {
  // special input
  specVerifyNonRectangularity: [[0, 0, 0],
                                [0, 0]],
  specZvector3: [0, 0, 0],
  specVerifyAlmostArrayOfArray: [[0, 0, 0],
                                 0,
                                 [0, 0, 0]],
  specEmpty11: [[]],
  specEmpty30: [[],
                [],
                []],
  specPartialIdentity23: [[1, 0, 0],
                          [0, 1, 0]],
  // zero matrices
  z11: [[0]],
  z12: [[0, 0]],
  z13: [[0, 0, 0]],
  z21: [[0],
        [0]],
  z22: [[0, 0],
        [0, 0]],
  z23: [[0, 0, 0],
        [0, 0, 0]],
  z32: [[0, 0],
        [0, 0],
        [0, 0]],
  z31: [[0],
        [0],
        [0]],
  z33: [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]],
  z34: [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
  z43: [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]],
  // identity matrices
  i11: [[1]],
  i22: [[1, 0],
        [0, 1]],
  i33: [[1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]]
  
}

describe('Verify', function() {
  describe('accepts rectangularity', function() {
    it('accepts 1x1 small square', function() {
      assert.isTrue(mb.verify(matrices.z11), 'a 1x1 square is a rectangle')
    }),
    it('accepts 2x2 larger square', function() {
      assert.isTrue(mb.verify(matrices.z22), 'a 2x2 square is a rectangle')
    }),
    it('accepts 3x3 largerer square', function() {
      assert.isTrue(mb.verify(matrices.z33))
    }),
    it('accepts 3x2 rectangle', function() {
      assert.isTrue(mb.verify(matrices.z32))
    }),
    it('accepts 2x3 rectangle', function() {
      assert.isTrue(mb.verify(matrices.z23))
    })
  }),
  describe('rejects non-rectangularity', function() {
    it('rejects different size rows', function() {
      assert.isFalse(mb.verify(matrices.specVerifyNonRectangularity))
    })
  })
  describe('accepts array of array', function() {
    it('accepts base case', function() {
      assert.isTrue(mb.verify(matrices.z11))
    })
  })
  describe('rejects array of not array', function() {
    it('rejects array of int', function() {
      assert.isFalse(mb.verify(matrices.specZvector3))
    }),
    it('rejects array of mostly arrays but one int', function() {
      assert.isFalse(mb.verify(matrices.verifyAlmostArrayOfArray))
    })
  })
  describe("rejects size 0", function() {
    it('rejects empty case', function() {
      assert.isFalse(mb.verify(matrices.specEmpty11))
    }),
    it('rejects width of 0', function() {
      assert.isFalse(mb.verify(matrices.specEmpty30))
    })
  })
})

describe('isSquare', function() {
  describe('accepts square(nxn) matrices', function() {
    it('accepts 1x1 square matrix', function() {
      assert.isTrue(mb.isSquare(matrices.z11))
    })
    it('accepts 3x3 square matrix', function() {
      assert.isTrue(mb.isSquare(matrices.z33))
    })
  }),
  describe('rejects non square(nxm, where n!=m) matrices', function() {
    it('rejects 1x2 matrix', function(){
      assert.isFalse(mb.isSquare(matrices.z12))
    }),
    it('rejects 2x1 matrix', function() {
      assert.isFalse(mb.isSquare(matrices.z21))
    }),
    it('rejects 3x4 matrix', function() {
      assert.isFalse(mb.isSquare(matrices.z34))
    })
  })
})

describe('isIdentity', function() {
  describe('accepts identity matrices', function() {
    it('accepts size 1 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i11))
    }),
    it('accepts size 2 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i22))
    }),
    it('accepts size 3 identity', function() {
      assert.isTrue(mb.isIdentity(matrices.i33))
    })
  }),
  describe('rejects non identity matrices', function() {
    it('rejects 1x1 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z11))
    }),
    it('rejects 2x2 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z22))
    }),
    it('rejects 3x3 0 matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.z33))
    }),
    it('rejects non square matrix', function() {
      assert.isFalse(mb.isIdentity(matrices.specPartialIdentity23))
    })
  })
})


describe('addDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      assert.isTrue(mb.addDefined(matrices.z11, matrices.z11))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      assert.isTrue(mb.addDefined(matrices.z33, matrices.z33))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      assert.isTrue(mb.addDefined(matrices.z23, matrices.z23))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      assert.isFalse(mb.addDefined(matrices.z11, matrices.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mb.addDefined(matrices.z11, matrices.z12))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      assert.isFalse(mb.addDefined(matrices.z11, matrices.z21))
    })
  })
})

describe('subDefined', function() {
  describe('accepts matrices of the same size', function(){
    it('accepts 1x1 and 1x1 matrices', function() {
      assert.isTrue(mb.subDefined(matrices.z11, matrices.z11))
    }),
    it('accepts 3x3 and 3x3 matrices', function() {
      assert.isTrue(mb.subDefined(matrices.z33, matrices.z33))
    }),
    it('accepts 2x3 and 2x3 matrices', function() {
      assert.isTrue(mb.subDefined(matrices.z23, matrices.z23))
    })
  }),
  describe('rejects matrices of different sizes', function() {
    it('rejects 1x1 and 2x2 matrices', function(){
      assert.isFalse(mb.subDefined(matrices.z11, matrices.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mb.subDefined(matrices.z11, matrices.z12))
    }),
    it('rejects 1x1 and 2x1 matrices', function() {
      assert.isFalse(mb.subDefined(matrices.z11, matrices.z21))
    })
  })
})

describe('rowValid accepts rows int r in {0..n-1}, for a nxa matrix', function() {
  describe('accepts rows in {0} for a 1x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mb.rowValid(matrices.z11, 0))
    })
  }),
  describe('rejects rows in Z\\{0} for a 1x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mb.rowValid(matrices.z11, -1))
    }),
    it('rejects 1', function() {
      assert.isFalse(mb.rowValid(matrices.z11, 1))
    })
  })
  describe('accepts rows in {0, 1, 2} for a 3x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mb.rowValid(matrices.z31, 0))
    }),
    it('accepts 1', function() {
      assert.isTrue(mb.rowValid(matrices.z31, 1))
    }),
    it('accepts 2', function() {
      assert.isTrue(mb.rowValid(matrices.z31, 2))
    })
  }),
  describe('rejects rows Z\\{0, 1, 2} for a 3x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mb.rowValid(matrices.z31, -1))
    }),
    it('rejects 3', function() {
      assert.isFalse(mb.rowValid(matrices.z31, 3))
    })
  })
})

describe('columnValid accepts rows int r in {0..n-1}, for a nxa matrix', function() {
  describe('accepts columns in {0} for a 1x1 matrix', function() {
    it('accepts 0', function() {
      assert.isTrue(mb.columnValid(matrices.z11, 0))
    })
  }),
  describe('rejects columns Z\\{0} for a 1x1 matrix', function() {
    it('rejects -1', function() {
      assert.isFalse(mb.columnValid(matrices.z11, -1))
    }),
    it('rejects 1', function() {
      assert.isFalse(mb.columnValid(matrices.z11, -1))
    })
  }),
  describe('accepts columns in {0, 1, 2} for a 1x3 matrix', function () {
    it('accepts 0', function () {
      assert.isTrue(mb.columnValid(matrices.z13, 0))
    }),
    it('accepts 1', function () {
      assert.isTrue(mb.columnValid(matrices.z13, 1))
    }),
    it('accepts 2', function () {
      assert.isTrue(mb.columnValid(matrices.z13, 2))
    })
  }),
  describe('rejects columns Z\\{0, 1, 2} for a 1x3 matrix', function () {
    it('rejects -1', function () {
      assert.isFalse(mb.columnValid(matrices.z13, -1))
    }),
    it('rejects 3', function () {
      assert.isFalse(mb.columnValid(matrices.z13, 3))
    })
  })
})



























