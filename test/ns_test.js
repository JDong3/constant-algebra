//objects of testing
const ns = require('../src')

//testing
const assert = require('chai').assert

//resources
const m = ns.res.matrices
const v = ns.res.vectors

//objects
List = require('immutable').List
F = require('fraction.js')

//ns
//ns.lib
//ns.lib.mb
describe('ns.lib.mb.isIdentity', function() {
  describe('checks for identity matrix', function() {
    it('accepts 1x1 identity matrix', function() {
      assert.isTrue(ns.lib.mb.isIdentity(m.i11))
    }),
    it('accepts 2x2 identity matrix', function() {
      assert.isTrue(ns.lib.mb.isIdentity(m.i22))
    }),
    it('accepts 3x3 identity matrix', function() {
      assert.isTrue(ns.lib.mb.isIdentity(m.i33))
    }),
    it('rejects 3x4 matrix', function() {
      assert.isFalse(ns.lib.mb.isIdentity(m.s34))
    }),
    it('rejects almost 3x3 identity matrix', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert.isFalse(ns.lib.mb.isIdentity(l))
    })
  })
})
describe('ns.lib.mb.isSquare', function() {
  describe('checks for square matrix', function() {
    it('accepts 1x1 square matrix', function() {
      assert.isTrue(ns.lib.mb.isSquare(m.i11))
    }),
    it('accepts 2x2 square matrix', function() {
      assert.isTrue(ns.lib.mb.isSquare(m.z22))
    }),
    it('rejects 1x2 non square matrix', function() {
      assert.isFalse(ns.lib.mb.isSquare(m.z12))
    }),
    it('rejects 4x3 non square matrix', function() {
      assert.isFalse(ns.lib.mb.isSquare(m.s34))
    })
  })
})
describe('ns.lib.mb.sameSize', function() {
  describe('checks for same sized matrices', function() {
    it('accepts 2 1x1 matrices', function() {
      assert.isTrue(ns.lib.mb.sameSize(m.i11, m.z11))
    }),
    it('accepts 2 2x2 matrices', function() {
      assert.isTrue(ns.lib.mb.sameSize(m.i22, m.z22))
    }),
    it('rejects 1x1 and 1x2 matrices', function() {
      assert.isFalse(ns.lib.mb.sameSize(m.i11, m.z12))
    })
  })
})
//ns.lib.mm
describe('ns.lib.mm.add', function() {
  describe('gives the sum of two same sized matrices', function() {
    it('can sum two 1x1 matrices', function() {
      const l = List([List([F(2)])])
      assert(ns.lib.mm.add(m.i11, m.i11).equals(l))
    }),
    it('can sum two 2x2 matrices', function() {
      const l = List([List([F(2), F(0)]),
                      List([F(0), F(2)])])
      assert(ns.lib.mm.add(m.i22, m.i22).equals(l))
    }),
    it('can sum two 4x3 matrices', function() {
      const l = List([List([F(0), F(2), F(4)]),
                      List([F(6), F(8), F(10)]),
                      List([F(12), F(14), F(16)]),
                      List([F(18), F(20), F(22)])])
      assert(ns.lib.mm.add(m.s43, m.s43).equals(l))
    })
  })
})
describe('ns.lib.mm.cofactors', function() {
  describe('gives the cofactor matrix of a matrix', function() {
    it('can cofactorize s33', function() {
      const l = List([List([F(0), F(6), F(-6)]),
                      List([F(18), F(-48), F(30)]),
                      List([F(-18), F(42), F(-24)])])
      assert(ns.lib.mm.cofactors(m.s33).equals(l))
    })
  })
})
describe('ns.lib.mm.inverse', function() {
  describe('gives the inverse matrix of a matrix', function() {
    it('can give the inverse of a 1x1 identity matrix', function() {

    })
  })
})
describe('ns.lib.mm.minor', function() {
  describe('gives the minor of a matrix with the rth row and cth column removed', function() {
    it('can remove the 1th row and 1th column from an identity matrix', function() {
      const l = List([List([F(1), F(0)]),
                      List([F(0), F(1)])])
      assert(ns.lib.mm.minor(m.i33, 1, 1).equals(l))
    })
  })
})
describe('ns.lib.mm.mul', function() {
  describe('gives the result of a matrix multiplied by another', function() {
    it('can mul two 1x1 matrices ([[1]]*[[5]] = [[5]])', function() {
      const m5 = List([List([F(5)])])
      const l = List([List([F(5)])])
      assert(ns.lib.mm.mul(m.o11, m5).equals(l))
    }),
    it('can mul a 3x1 with a 1x3 matrix (m.s13 * m.s31)', function() {
      const l = List([List([F(5)])])
      assert(ns.lib.mm.mul(m.s13, m.s31).equals(l))
    }),
    it('can mul a 1x3 matrix with a 3x1 matrix (m.s31 * m.s13)', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(2), F(4)])])
      assert(ns.lib.mm.mul(m.s31, m.s13).equals(l))
    }),
    it('can mul a 3x4 matrix  with a 4x3 matrix (m.s34 * m.s43)', function() {
      const l = List([List([F(42), F(48), F(54)]),
                      List([F(114), F(136), F(158)]),
                      List([F(186), F(224), F(262)])])
      assert(ns.lib.mm.mul(m.s34, m.s43).equals(l))
    }),
    it('can mul a 4x3 matrix with a 3x4 amtrix (m.s43 * m.s34)', function() {
      const l = List([List([F(20), F(23), F(26), F(29)]),
                      List([F(56), F(68), F(80), F(92)]),
                      List([F(92), F(113), F(134), F(155)]),
                      List([F(128), F(158), F(188), F(218)])])
      assert(ns.lib.mm.mul(m.s43, m.s34).equals(l))
    })
  })
})
describe('ns.lib.mm.rowAdd', function() {
  describe('gives the result of elementary row addition on a matrix', function() {
    it('can add the 1th row to the 0th row on a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(1), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(ns.lib.mm.rowAdd(m.i33, 0, 1, 1).equals(l))
    }),
    it('can add the 1th row twice to the 2th row of a 3x3 matrix (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(1), F(0)]),
                      List([F(0), F(2), F(1)])])
      assert(ns.lib.mm.rowAdd(m.i33, 2, 1, 2).equals(l))
    })
  })
})
describe('ns.lib.mm.rowScale', function() {
  describe('gives the result of elementary row scale on a matrix', function() {
    it('can scale the second row of a 3x3 matrix by 3 (m.i33)', function() {
      const l = List([List([F(1), F(0), F(0)]),
                      List([F(0), F(3), F(0)]),
                      List([F(0), F(0), F(1)])])
      assert(ns.lib.mm.rowScale(m.i33, 1, 3).equals(l))
    })
  })
})
describe('ns.lib.mm.rowSwap', function() {
  describe('geves the result of elementary row swap on a matrix', function() {
    it('can swap the 1th row with the 1th row on a 3x3 matrix (m.i33)', function() {
      assert(ns.lib.mm.rowSwap(m.i33, 1, 1).equals(m.i33))
    }),
    it('can swap the 0th row with the 2th row on a 3x3 amtrix (m.i33)', function() {
      const l = List([List([F(0), F(0), F(1)]),
                      List([F(0), F(1), F(0)]),
                      List([F(1), F(0), F(0)])])
      assert(ns.lib.mm.rowSwap(m.i33, 0, 2).equals(l))
    })
  })
})
describe('ns.lib.mm.rref', function() {
  describe('gives the row reduced echelon form of a matrix', function() {
    it('can reffify a 1x1 matrix (m.i11)', function() {
      assert(ns.lib.mm.rref(m.i11).equals(m.i11))
    }),
    it('can reffify a 2x2 matrix (m.i22)', function() {
      assert(ns.lib.mm.rref(m.i22).equals(m.i22))
    }),
    it('can reffify a 3x3 matrix (m.i33)', function() {
      assert(ns.lib.mm.rref(m.i33).equals(m.i33))
    }),
    it('can reffify a harder 3x3 matrix (m.s33)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)])])
      assert(ns.lib.mm.rref(m.s33).equals(l))
    }),
    it('can reffify a 3x4 matrix (m.s34)', function() {
      const l = List([List([F(1), F(0), F(-1), F(-2)]),
                      List([F(0), F(1), F(2), F(3)]),
                      List([F(0), F(0), F(0), F(0)])])
      assert(ns.lib.mm.rref(m.s34).equals(l))
    }),
    it('can reffify a 4x3 matrix (m.s43)', function() {
      const l = List([List([F(1), F(0), F(-1)]),
                      List([F(0), F(1), F(2)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(ns.lib.mm.rref(m.s43).equals(l))
    }),
    it('can reffify a 3x3 matrix (m.o33)', function() {
      const l = List([List([F(1), F(1), F(1)]),
                     List([F(0), F(0), F(0)]),
                     List([F(0), F(0), F(0)])])
      assert(ns.lib.mm.rref(m.o33).equals(l))
    })
  })
})
describe('ns.lib.mm.sub', function() {
  describe('gives the difference of two same sized matrices', function() {
    it('can sub two 1x1 matrices', function() {
      const l = List([List([F(0)])])
      assert(ns.lib.mm.sub(m.i11, m.i11).equals(l))
    }),
    it('can sub two 2x2 matrices', function() {
      const l = List([List([F(0), F(0)]),
                      List([F(0), F(0)])])
      assert(ns.lib.mm.sub(m.i22, m.i22).equals(l))
    }),
    it('can sub two 4x3 matrices', function() {
      const l = List([List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)]),
                      List([F(0), F(0), F(0)])])
      assert(ns.lib.mm.sub(m.s43, m.s43).equals(l))
    })
  })
})
describe('ns.lib.mm.transpose', function() {
  describe('gives the transpose of a matrix', function() {
    it('can transpose a 1x1 matrix', function() {
      assert(ns.lib.mm.transpose(m.i11).equals(m.i11))
    }),
    it('can transpose a 1x3 matrix', function() {
      assert(ns.lib.mm.transpose(m.z13).equals(m.z31))
    }),
    it('can transpose a 3x1 matrix', function() {
      assert(ns.lib.mm.transpose(m.z31).equals(m.z13))
    }),
    it('can transpose a 3x4 matrix', function() {
      const l = List([List([F(0) ,F(4), F(8)]),
                      List([F(1), F(5), F(9)]),
                      List([F(2), F(6), F(10)]),
                      List([F(3), F(7), F(11)])])
      assert(ns.lib.mm.transpose(m.s34).equals(l))
    })
  })
})
//ns.lib.mn
describe('ns.lib.mn.det', function() {
  describe('gives the determinant of a square matrix', function() {
    it('gives the determinant of a 1x1 matrix (m.i11)', function() {
      assert(ns.lib.mn.det(m.i11).equals(F(1)))
    }),
    it('gives the determinant of a 2x2 matrix (m.s22)', function() {
      assert(ns.lib.mn.det(m.s22).equals(F(-2)))
    })
  })
})
//ns.lib.mv
describe('ns.lib.mv.antiDiagonal', function() {
  describe('gives the antiDiagonal of a square matrix', function() {
    it('can get the antiDiagonal of a 3x3 matrix(m.s33)', function() {
      const l = List([F(2), F(4), F(6)])
      assert(ns.lib.mv.antiDiagonal(m.s33).equals(l))
    })
  })
})
//ns.lib.mv
describe('ns.lib.mv.column', function() {
  describe('gives a column vector of a matrix', function() {
    it('can get the 0th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(0), F(3), F(6)])
      assert(ns.lib.mv.column(m.s33, 0))
    }),
    it('can get the 1th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(1), F(4), F(7)])
      assert(ns.lib.mv.column(m.s33, 1))
    }),
    it('can get the 2th column of a 3x3 matrix(m.s33)', function() {
      const l = List([F(2), F(5), F(8)])
      assert(ns.lib.mv.column(m.s33, 2))
    })
  })
})
describe('ns.lib.mv.diagonal', function() {
  describe('gives the diagonal of a square matrix', function() {
    it('can get the diagonal of a 3x3 matrix(m.s33)', function() {
      const l = List([F(0), F(4), F(8)])
      assert(ns.lib.mv.diagonal(m.s33).equals(l))
    })
  })
})
describe('ns.lib.mv.row', function() {
  describe('gives a row vector of a matrix', function() {
    it('can give the 0th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(0), F(1), F(2)])
      assert(ns.lib.mv.row(m.s33, 0).equals(l))
    }),
    it('can give the 1th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(3), F(4), F(5)])
      assert(ns.lib.mv.row(m.s33, 1).equals(l))
    }),
    it('can give the 2th row of a 3x3 matrix (m.s33)', function() {
      const l = List([F(6), F(7), F(8)])
      assert(ns.lib.mv.row(m.s33, 2).equals(l))
    })
  })
})
//ns.lib.vb
describe('ns.lib.vb.sameSize', function() {
  describe('checks for same sized vectors', function() {
    it('accepts two size 1 vectors', function() {
      assert.isTrue(ns.lib.vb.sameSize(v.o1, v.o1))
    }),
    it('accepts two size 2 vectors', function() {
      assert.isTrue(ns.lib.vb.sameSize(v.o2, v.z2))
    }),
    it('rejects size 1 and size 2 vectors', function() {
      assert.isFalse(ns.lib.vb.sameSize(v.o2, v.o1))
    })
  })
})
//ns.lib.vn
describe('ns.lib.vn.dot', function() {
  describe('gives the dot product of two same sized vectors', function() {
    it('can dot two length 1 vectors (v.o1 * v.z1)', function() {
      const k = F(0)
      assert(ns.lib.vn.dot(v.o1, v.z1).equals(k))
    }),
    it('can dot two length 1 vectors (v.o1 * v.o1)', function() {
      const k = F(1)
      assert(ns.lib.vn.dot(v.o1, v.o1).equals(k))
    }),
    it('can dot two length 3 vectors (v.s3 * v.s3)', function() {
      const k = F(5)
      assert(ns.lib.vn.dot(v.s3, v.s3).equals(k))
    })
  })
})
//ns.lib.vv
describe('ns.lib.vv.add', function() {
  describe('gives the sum of two same sized vectors', function() {
    it('can add two size 1 vectors (v.o1 + v.o1)', function() {
      const l = List([F(2)])
      assert(ns.lib.vv.add(v.o1, v.o1).equals(l))
    }),
    it('can add two size 2 vectors (v.o2 + v.o2)', function() {
      const l = List([F(2), F(2)])
      assert(ns.lib.vv.add(v.o2, v.o2).equals(l))
    })
  })
})
describe('ns.lib.vv.scale', function() {
  describe('gives the scalar product of a matrix and a fraction', function () {
    it('can scale a length 1 vector (2*v.o1)', function() {
      const l = List([F(2)])
      assert(ns.lib.vv.scale(v.o1, 2).equals(l))
    }),
    it('can scale a length 2 vector (2*v.o2)', function() {
      const l = List([F(2), F(2)])
      assert(ns.lib.vv.scale(v.o2, 2).equals(l))
    })
  })
})
describe('ns.lib.vv.sub', function() {
  describe('gives the difference of two same sized vectors', function () {
    it('can diff two size 1 vectors (v.o1 - v.o1)', function () {
      assert(ns.lib.vv.sub(v.o1, v.o1).equals(v.z1))
    }),
    it('can diff two size 2 vectors (v.o2 - v.o2)', function () {
      assert(ns.lib.vv.sub(v.o2, v.o2).equals(v.z2))
    })
  })
})

//ns.util
describe('ns.util.convertBool', function() {
  describe('converts a boolean value to a corresponding value either 1 or 0', function() {
    it('can convert a true to 1', function() {
      assert.equal(ns.util.convertBool(true), 1)
    }),
    it('can convert a false to 0', function() {
      assert.equal(ns.util.convertBool(false), 0)
    })
  })
})
//ns.util.size
describe('ns.util.size.number', function() {
  describe('gives the length of the number in string form', function() {
    it('can determie the size of 0', function() {
      assert.equal(ns.util.size.number(0), 1)
    }),
    it('can determine the size of 1', function() {
      assert.equal(ns.util.size.number(1), 1)
    }),
    it('can determine the size of a negative number -1', function() {
      assert.equal(ns.util.size.number(-1), 2)
    }),
    it('can determine the size of a 2 digit positive number 25', function() {
      assert.equal(ns.util.size.number(25), 2)
    }),
    it('can determine the size of a 2 digit negative number -65', function() {
      assert.equal(ns.util.size.number(-65), 3)
    })
  })
})
describe('ns.util.size.fraction', function() {
  describe('gives the length of the fractionin string form', function() {
    it('can give the size of a single digit number 1', function() {
      assert.equal(ns.util.size.fraction(F(1)), 1)
    }),
    it('can give the size of a fraction that is a negative integer -5', function() {
      assert.equal(ns.util.size.fraction(F(-5)), 2)
    })
    it('can give the size of a fraction with denominator 1, 1/1', function() {
      assert.equal(ns.util.size.fraction(F(1, 1)), 1)
    }),
    it('can give the size of a fraction with denominator not 1, 1/2', function() {
      assert.equal(ns.util.size.fraction(F(1, 2)), 3)
    }),
    it('can give the size of a fraction with a negative numerator -13/17', function() {
      assert.equal(ns.util.size.fraction(F(-13, 17)), 6)
    }),
    it('can give the size of a fraction with a negative denominator 13/-17', function() {
      assert.equal(ns.util.size.fraction(F(13, -17)), 6)
    }),
    it('can give the size of a fraction with a negative numerator and denominator -13/-17', function() {
      assert.equal(ns.util.size.fraction(F(-13, -17)), 5)
    })
  })
})
//ns.util.test
describe('ns.util.test.openParens', function() {
  describe('it tells you if the start of a string matches a openParens pattern', function() {
    it('can recognise an open parentheses, (', function(){
      assert.isOk(ns.util.test.openParens('('))
    }),
    it('can recognise an open square bracket, [', function() {
      assert.isOk(ns.util.test.openParens('['))
    }),
    it('can recognise an open curly bracket, {', function() {
      assert.isOk(ns.util.test.openParens('{'))
    }),
    it('can recognise an open parens followed by a character, (a', function() {
      assert.isOk(ns.util.test.openParens('(a'))
    }),
    it('cannot recognise a non openParens character, a', function() {
      assert.isNotOk(ns.util.test.openParens('a'))
    })
  })
})
describe('ns.util.test.closeParens', function() {
  describe('it tells you if the start of a string matches a closeParens pattern', function() {
    it('can recognise an close parentheses, )', function(){
      assert.isOk(ns.util.test.closeParens(')'))
    }),
    it('can recognise an close square bracket, ]', function() {
      assert.isOk(ns.util.test.closeParens(']'))
    }),
    it('can recognise an close curly bracket, }', function() {
      assert.isOk(ns.util.test.closeParens('}'))
    }),
    it('can recognise an close parens followed by a character, )a', function() {
      assert.isOk(ns.util.test.closeParens(')a'))
    }),
    it('cannot recognise a non closeParens character, a', function() {
      assert.isNotOk(ns.util.test.closeParens('a'))
    })
  })
})
describe('ns.util.test.divider', function() {
  describe('it tells you if the start of a string matches a divider pattern', function() {
    it('can recognise a comma, ,', function() {
      assert.isOk(ns.util.test.divider(','))
    }),
    it('can recognise a comma followed by a character, ,a', function() {
      assert.isOk(ns.util.test.divider(',a'))
    }),
    it('cannot recognise a non divider character, a', function() {
      assert.isNotOk(ns.util.test.divider('a'))
    })
  })
})
describe('ns.util.test.slash', function() {
  describe('it tells you if the start of a string matches a slash pattern', function () {
    it('can recognise a slash, /', function() {
      assert.isOk(ns.util.test.slash('/'))
    }),
    it('can recognise a slash followed by a character, /a', function() {
      assert.isOk(ns.util.test.slash('/a'))
    }),
    it('cannot recognise a non slash pattern, a', function() {
      assert.isNotOk(ns.util.test.slash('a'))
    })
  })
})
describe('ns.util.test.digit', function() {
  describe('it tells you if the start of a string matches a digit pattern', function() {
    it('can recognise a digit, 1', function() {
      assert.isOk(ns.util.test.digit('1'))
    }),
    it('can recognise two digits, 34', function() {
      assert.isOk(ns.util.test.digit('34'))
    }),
    it('can recognise a digit followed by a non digit character, 2a', function() {
      assert.isOk(ns.util.test.digit('2a'))
    }),
    it('cannot recognise a non digit character, a', function() {
      assert.isNotOk(ns.util.test.digit('a'))
    }),
    it('cannot recognise a non digit character followed by a digit, a2', function() {
      assert.isNotOk(ns.util.test.digit('a2'))
    })
  })
})
describe('ns.util.test.number', function() {
  describe('it tells you if the start of a string matches a number pattern', function() {
    it('can recognise a single digit number, 1', function() {
      assert.isOk(ns.util.test.number('1'))
    }),
    it('can recognise a 2 digit number, 12', function() {
      assert.isOk(ns.util.test.number('12'))
    }),
    it('can recognise a negative number, -123', function() {
      assert.isOk(ns.util.test.number('-123'))
    }),
    it('can recognise a number followed by not number, 123a', function() {
      assert.isOk(ns.util.test.number('123a'))
    }),
    it('cannot recognise a non number pattern followed by a number, a123', function() {
      assert.isNotOk(ns.util.test.number('a123'))
    })
  })
})
describe('ns.util.test.fraction', function() {
  describe('it tells you if the start of a string matches a fraction pattern', function() {
    it('can recognise a number, 123', function() {
      assert.isOk(ns.util.test.fraction('123'))
    }),
    it('can recognise a negative number, -123', function() {
      assert.isOk(ns.util.test.fraction('-123'))
    }),
    it('can recognise a fraction with positive num and denum, 13/17', function() {
      assert.isOk(ns.util.test.fraction('13/17'))
    }),
    it('can recognise a fraction with negative num and positive denum, -13/17', function() {
      assert.isOk(ns.util.test.fraction('-13/17'))
    }),
    it('can recognise a fraction with positive num and negative denum, 13/-17', function() {
      assert.isOk(ns.util.test.fraction('13/-17'))
    }),
    it('can recognise a fraction with negative num and denum, -13/-17', function() {
      assert.isOk(ns.util.test.fraction('-13/-17'))
    }),
    it('cannot recognise a non fraction pattern followed by a fraction, a13/17', function() {
      assert.isNotOk(ns.util.test.fraction('a13/17'))
    })
  })
})
describe('ns.util.test.vector', function() {
  describe('it tells you if the start of a string matches a vector pattern', function() {
    it('can recognise a vector with a single fraction. (13/17)', function() {
      assert.isOk(ns.util.test.vector('(13/17)'))
    }),
    it('can recognise a vector with two fractions, (13/17,-1/3)', function() {
      assert.isOk(ns.util.test.vector('(13/17,-1/3)'))
    }),
    it('can recognise a vector with 3 fractions, (13/17, -1/3, 20)', function() {
      assert.isOk(ns.util.test.vector('(13/17,-1/3,20)'))
    }),
    it('can recognise a vector followed by a character, (1)a', function() {
      assert.isOk(ns.util.test.vector('(1)a'))
    }),
    it('cannot recognise a non vector pattern followed by a vector, a(1)', function() {
      assert.isNotOk(ns.util.test.vector('a(1)'))
    })
  })
})
describe('ns.util.test.matrix', function() {
  describe('it tells you if the start of a string matches a matrix pattern', function() {
    it('can recognise a 1x1 matrix, ((13/17))', function() {
      assert.isOk(ns.util.test.matrix('((13/17))'))
    }),
    it('can recognise a matrix wil two vectors, ((13/17,-13,2),(5,1,1/2))', function() {
      assert.isOk(ns.util.test.matrix('((13/17,-13,2),(5,1,1/2))'))
    }),
    it('can recognose a matrix followed by a character, ((1))a', function() {
      assert.isOk(ns.util.test.matrix('((1))a'))
    }),
    it('cannot recognise a character followed by a matrix, a((1))', function() {
      assert.isNotOk(ns.util.test.matrix('a((1))'))
    })
  })
})
//ns.util.extract
describe('ns.util.extract.openParens', function() {
  describe('it can extract an openParens pattern from the start of a string', function() {
    it('can extract an open parentheses, (', function() {
      const res = ns.util.extract.openParens('(')
      assert.equal(res.res, '(')
      assert.equal(res.size, 1)
    }),
    it('can extract an open square bracket, [', function() {
      const res = ns.util.extract.openParens('[')
      assert.equal(res.res, '[')
      assert.equal(res.size, 1)
    }),
    it('can extract an open curly bracket, {', function() {
      const res = ns.util.extract.openParens('{')
      assert.equal(res.res, '{')
      assert.equal(res.size, 1)
    }),
    it('can extract an openParens pattern followed by non openParens, (a', function() {
      const res = ns.util.extract.openParens('(a')
      assert.equal(res.res, '(')
      assert.equal(res.size, 1)
    })
  })
})
describe('ns.util.extract.closeParens', function() {
  describe('it extracts a closeParens pattern from the start of a string', function() {
    it('can extract a close parentheses, )', function() {
      const res = ns.util.extract.closeParens(')')
      assert.equal(res.res, ')')
      assert.equal(res.size, 1)
    }),
    it('can extract a closeParens pattern followed by a character, )a', function() {
      const res = ns.util.extract.closeParens(')a')
      assert.equal(res.res, ')')
      assert.equal(res.size, 1)
    })
  })
})
describe('ns.util.extract.divider', function() {
  describe('it extracts a divider pattern from the start of a string', function() {
    it('can extract a comma, ,', function() {
      const res = ns.util.extract.divider(',')
      assert.equal(res.res, ',')
      assert.equal(res.size, 1)
    }),
    it('can extract a comma followed by a character, ,a', function() {
      const res = ns.util.extract.divider(',a')
      assert.equal(res.res, ',')
      assert.equal(res.size, 1)
    })
  })
})
describe('ns.util.extract.slash', function() {
  describe('it extracts a slash pattern from the start of a string', function() {
    it('can extract a slash, /', function() {
      const res = ns.util.extract.slash('/')
      assert.equal(res.res, '/')
      assert.equal(res.size, 1)
    }),
    it('can extract a slash followed by a character, /a', function() {
      const res = ns.util.extract.slash('/a')
      assert.equal(res.res, '/')
      assert.equal(res.size, 1)
    })
  })
})
describe('ns.util.extract.digit', function() {
  describe('it extract a digit pattern from the start of a string', function() {
    it('can extract a digit, 1', function() {
      const res = ns.util.extract.digit('1')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    }),
    it('can extract a digit followed by a character, 1a', function() {
      const res = ns.util.extract.digit('1a')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    })
  })
})
describe('ns.util.extract.number', function() {
  describe('it extracts a number pattern from the start of a string', function() {
    it('can extract a single digit number, 1', function() {
      const res = ns.util.extract.number('1')
      assert.equal(res.res, 1)
      assert.equal(res.size, 1)
    }),
    it('can extract a double digit number, 12', function() {
      const res = ns.util.extract.number('12')
      assert.equal(res.res, 12)
      assert.equal(res.size, 2)
    }),
    it('can extract a negative number, -12', function() {
      const res = ns.util.extract.number('-12')
      assert.equal(res.res, -12)
      assert.equal(res.size, 3)
    }),
    it('can extract a number followed by a character, -12a', function() {
      const res = ns.util.extract.number('-12a')
      assert.equal(res.res, -12)
      assert.equal(res.size, 3)
    })
  })
})
describe('ns.util.extract.fraction', function() {
  describe('it extracts the fraction at the start of a string', function() {
    it('can extract a number, -13', function() {
      const res = ns.util.extract.fraction('-13')
      assert.isTrue(res.res.equals(F(-13)))
      assert.equal(res.size, 3)
    }),
    it('can extract a fraction with positive num and denum, 13/17', function() {
      const res = ns.util.extract.fraction('13/17')
      assert.isTrue(res.res.equals(F(13, 17)))
      assert.equal(res.size, 5)
    }),
    it('can extract a fraction with negative num and positive denum, -13/17', function() {
      const res = ns.util.extract.fraction('-13/17')
      assert.isTrue(res.res.equals(F(-13, 17)))
      assert.equal(res.size, 6)
    }),
    it('can extract a fraction with a positive num and negative denum, 13/-17', function() {
      const res = ns.util.extract.fraction('13/-17')
      assert.isTrue(res.res.equals(F(13, -17)))
      assert.equal(res.size, 6)
    }),
    it('can extract a fraction with a negative num and denum, -13/-17', function() {
      const res = ns.util.extract.fraction('-13/-17')
      assert.isTrue(res.res.equals(F(13, 17)))
      assert.equal(res.size, 7)
    }),
    it('can extract a non reduced fraction, 2/10', function() {
      const res = ns.util.extract.fraction('2/10')
      assert.isTrue(res.res.equals(F(1, 5)))
      assert.equal(res.size, 4)
    })
  })
})
describe('ns.util.extract.vector', function() {
  describe('it extracts a vector from the start of a string', function() {
    it('can extract a vector with a single fraction, (13/17)', function() {
      const res = ns.util.extract.vector('(13/17)')
      const expected = List([F(13, 17)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 7)
    }),
    it('can extract a vector with 3 fractions, (1,2,1/3)', function() {
      const res = ns.util.extract.vector('(1,2,1/3)')
      const expected = List([F(1), F(2), F(1, 3)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 9)
    }),
    it('can extract a vector followed by a character, (1)a', function() {
      const res = ns.util.extract.vector('(1)a')
      const expected = List([F(1)])
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 3)
    })
  })
})
describe('ns.util.extract.matrix', function() {
  describe('it extracts a matrix from the start of a string', function() {
    it('can extract a matrix with a single vector, ((1))', function() {
      const res = ns.util.extract.matrix('((1))')
      const expected = List()
      const expected2 = expected.push(List([F(1)]))
      assert.isOk(res.res.equals(expected2))
      assert.equal(res.size, 5)
    }),
    it('can extract a matrix with 3 vectors, ((1),(1),(1))', function() {
      const res = ns.util.extract.matrix('((1),(1),(1))')
      const expected = (
        List([
          List([F(1)]), List([F(1)]), List([F(1)])
        ])
      )
      assert.isTrue(res.res.equals(expected))
      assert.equal(res.size, 13)
    })
  })
})
