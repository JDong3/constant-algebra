const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const top = require('..')
const m = top.matrices
const v = top.vectors
const mb = top.mb
const mm = top.mm

describe('mb.isIdentity', function() {
  describe('checks for identity matrix', function() {
    it('accepts 1x1 identity matrix', function() {
      assert.isTrue(mb.isIdentity(m.i11))
    }),
    it('accepts 2x2 identity matrix', function() {
      assert.isTrue(mb.isIdentity(m.i22))
    }),
    it('accepts 3x3 identity matrix', function() {
      assert.isTrue(mb.isIdentity(m.i33))
    }),
    it('rejects 3x4 matrix', function() {
      assert.isFalse(mb.isIdentity(m.s34))
    }),
    it('rejects almost 3x3 identity matrix', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert.isFalse(mb.isIdentity(l))
    })
  })
})

describe('mb.isSquare', function() {
  describe('checks for square matrix', function() {
    it('accepts 1x1 square matrix', function() {
      assert.isTrue(mb.isSquare(m.i11))
    }),
    it('accepts 2x2 square matrix', function() {
      assert.isTrue(mb.isSquare(m.z22))
    }),
    it('rejects 1x2 non square matrix', function() {
      assert.isFalse(mb.isSquare(m.z12))
    }),
    it('rejects 4x3 non square matrix', function() {
      assert.isFalse(mb.isSquare(m.s34))
    })
  })
})

describe('mb.sameSize', function() {
  describe('checks for same sized matrices', function() {
    it('accepts 2 1x1 matrices', function() {
      assert.isTrue(mb.sameSize(m.i11, m.z11))
    }),
    it('accepts 2 2x2 matrices', function() {
      assert.isTrue(mb.sameSize(m.i22, m.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(mb.sameSize(m.i11, m.z12))
    })
  })
})

describe('mm.add', function() {
  describe('gives the sum of two same sized matrices', function() {
    it('can sum two 1x1 matrices', function() {
      const l = List([List([F(2)])])
      assert(mm.add(m.i11, m.i11).equals(l))
    }),
    it('can sum two 2x2 matrices', function() {
      const l = List([List([F(2), F(0)]),
                      List([F(0), F(2)])])
      assert(mm.add(m.i22, m.i22).equals(l))
    }),
    it('can sum two 4x3 matrices', function() {
      const l = List([List([F(0), F(2), F(4)]),
                      List([F(6), F(8), F(10)]),
                      List([F(12), F(14), F(16)]),
                      List([F(18), F(20), F(22)])])
      assert(mm.add(m.s43, m.s43).equals(l))
    })
  })
})

describe('mm.minor', function() {
  describe('gives the minor of a matrix with the rth row and cth column removed', function() {
    it('can remove the 1th row and 1th column from an identity matrix', function() {
      const l = List([List([F(1), F(0)]),
                      List([F(0), F(1)])])
      assert(mm.minor(m.i33, 1, 1).equals(l))
    })
  })
})

describe('mm.mul', function() {
  describe('gives the result of a matrix multiplied by another', function() {
    it('can mul two 1x1 matrices ([[1]]*[[5]] = [[5]])', function() {
      const m5 = List([List([F(5)])])
      const l = List([List([F(5)])])
      assert(mm.mul(m.o11, m5).equals(l))
    }),
    it('can mul a 3x1 with a 1x3 matrix (m.s13 * m.s31)', function() {
      const l = List([List([F(5)])])
      assert(mm.mul(m.s13, m.s31).equals(l))
    }),
    it('can mul a 1x3 matrix with a 3x1 matrix (m.s31 * m.s13)', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(2), F(4)])])
      assert(mm.mul(m.s31, m.s13).equals(l))
    }),
    it('can mul a 3x4 matrix  with a 4x3 matrix (m.s34 * m.s43)', function() {
      const l = List([List([F(42), F(48), F(54)]),
                      List([F(114), F(136), F(158)]),
                      List([F(186), F(224), F(262)])])
      assert(mm.mul(m.s34, m.s43).equals(l))
    }),
    it('can mul a 4x3 matrix with a 3x4 amtrix (m.s43 * m.s34)', function() {
      const l = List([List([F(20), F(23), F(26), F(29)]),
                      List([F(56), F(68), F(80), F(92)]),
                      List([F(92), F(113), F(134), F(155)]),
                      List([F(128), F(158), F(188), F(218)])])
      assert(mm.mul(m.s43, m.s34).equals(l))
    })
  })
})

describe('mm.rowAdd', function() {
  describe('gives the result of elementary row addition on a matrix', function() {
    it('can add the 1th row to the 0th row on a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(1), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(mm.rowAdd(m.i33, 0, 1, 1).equals(l))
    }),
    it('can add the 1th row twice to the 2th row of a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(2), F(1)])])
      assert(mm.rowAdd(m.i33, 2, 1, 2).equals(l))
    })
  })
})

describe('mm.rowScale', function() {
  describe('gives the result of elementary row scale on a matrix', function() {
    it('can scale the second row of a 3x3 matrix by 3 (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(3), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(mm.rowScale(m.i33, 1, 3).equals(l))
    })
  })
})

describe('mm.rowSwap', function() {
  describe('geves the result of elementary row swap on a matrix', function() {
    it('can swap the 1th row with the 1th row on a 3x3 matrix (m.i33)', function() {
      assert(mm.rowSwap(m.i33, 1, 1).equals(m.i33))
    }),
    it('can swap the 0th row with the 2th row on a 3x3 amtrix (m.i33)', function() {
      const l = List([List([F(0), F(0), F(1)]),
                      List([F(0), F(1), F(0)]),
                      List([F(1), F(0), F(0)])])
      assert(mm.rowSwap(m.i33, 0, 2).equals(l))
    })
  })
})

describe('mm.rref', function() {
  describe('gives the row reduced echelon form of a matrix', function() {
    it('can reffify a 1x1 matrix (m.i11)', function() {
      assert(mm.rref(m.i11).equals(m.i11))
    }),
    it('can reffify a 2x2 matrix (m.i22)', function() {
      assert(mm.rref(m.i22).equals(m.i22))
    }),
    it('can reffify a 3x3 matrix (m.i33)', function() {
      assert(mm.rref(m.i33).equals(m.i33))
    }),
    it('can reffify a harder 3x3 matrix (m.s33)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)])])
      assert(mm.rref(m.s33).equals(l))
    }),
    it('can reffify a 3x4 matrix (m.s34)', function() {
      const l = List([List([F(1), F(0), F(-1), F(-2)]),
                      List([F(0), F(1), F(2), F(3)]),
                      List([F(0), F(0), F(0), F(0)])])
      assert(mm.rref(m.s34).equals(l))
    }),
    it('can reffify a 4x3 matrix (m.s43)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(mm.rref(m.s43).equals(l))
    }),
    it('can reffify a 3x3 matrix (m.o33)', function() {
      const l = List([List([F(1), F(1), F(1)]),
                     List([F(0), F(0), F(0)]),
                     List([F(0), F(0), F(0)])])
      assert(mm.rref(m.o33).equals(l))
    })
  })
})

describe('mm.sub', function() {
  describe('gives the difference of two same sized matrices', function() {
    it('can sub two 1x1 matrices', function() {
      const l = List([List([F(0)])])
      assert(mm.sub(m.i11, m.i11).equals(l))
    }),
    it('can sub two 2x2 matrices', function() {
      const l = List([List([F(0), F(0)]),
                      List([F(0), F(0)])])
      assert(mm.sub(m.i22, m.i22).equals(l))
    }),
    it('can sub two 4x3 matrices', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(mm.sub(m.s43, m.s43).equals(l))
    })
  })
})

describe('mm.transpose', function() {
  describe('gives the transpose of a matrix', function() {
    it('can transpose a 1x1 matrix', function() {
      assert(mm.transpose(m.i11).equals(m.i11))
    }),
    it('can transpose a 1x3 matrix', function() {
      assert(mm.transpose(m.z13).equals(m.z31))
    }),
    it('can transpose a 3x1 matrix', function() {
      assert(mm.transpose(m.z31).equals(m.z13))
    }),
    it('can transpose a 3x4 matrix', function() {
      const l = List([List([F(0) ,F(4), F(8)]),
                      List([F(1), F(5), F(9)]),
                      List([F(2), F(6), F(10)]),
                      List([F(3), F(7), F(11)])])
      assert(mm.transpose(m.s34).equals(l))
    })
  })
})
