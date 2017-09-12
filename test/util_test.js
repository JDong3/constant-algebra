const util = require('..').util
const assert = require('chai').assert
const F = require('mathjs').fraction
const List = require('immutable').List
const m = require('..').matrices

describe('util.parseNumber', function() {
  describe('parses a number and give the fraction that represents it', function() {
    it('can parse a number with no slash', function () {
      const number = '123'
      assert(util.parseNumber(number).equals(F(123)))
    }),
    it('can parse a number with 1 slash', function() {
      const number = '12/34'
      assert(util.parseNumber(number).equals(F(12, 34)))
    }),
    it('cannot parse a number with slash a front', function() {
      const number = '/123'
      assert.isNotOk(util.parseNumber(number))
    })
  })
})

describe('util.readNumber', function() {
  describe('reads a number from a string and returns a List of ending index + 1 and read value, otherwise falsy', function() {
      it('can read a string of just a number at 0 index', function() {
        const string = '123'
        const i = 0
        assert(util.readNumber(string, i).equals(List([3, F(123)])))
      }),
      it('can read a string of numbers and letters at 0 index', function () {
        const string = '12a'
        const i = 0
        assert(util.readNumber(string, i).equals(List([2, F(12)])))
      }),
      it('can read a string of numbers and letters at 3 index', function() {
        const string = 'abc123'
        const i = 3
        assert(util.readNumber(string, i).equals(List([6, F(123)])))
      }),
      it('can read a string with a slash in it', function() {
        const string = '12/34'
        const i = 0
        assert(util.readNumber(string, i).equals(List([5, F(12, 34)])))
      }),
      it('cannot read a letter', function() {
        const string = 'abc'
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      }),
      it('cannot read nothing', function() {
        const string = ''
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      }),
      it('cannot read a number with a slash at the front', function() {
        const string = '/123'
        const i = 0
        assert.isNotOk(util.readNumber(string, i))
      })
    })
})


describe('util.readDiv', function() {
  describe('reads a divider from a string at index, truthy on success, falsy on failure', function() {
    it('can read a divider at index 1', function() {
      const string = '0,'
      const i = 1
      assert(util.readDiv(string, i))
    }),
    it('cannot read no divider', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readDiv(string, i))
    }),
    it('passes on reading nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readDiv(string, i))
    })
  })
})

describe('util.readOpen', function() {
  describe('reads a open parens from a string at index and returns the index + 1 of where it ends, falsy on failure', function() {
    it('can read a open parens at index 1', function() {
      const string = '0['
      const i = 1
      assert(util.readOpen(string, i))
    }),
    it('cannot read no open parens', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readOpen(string, i))
    }),
    it('cannot read nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readOpen(string, i))
    })
  })
})

describe('util.readClose', function() {
  describe('reads a close parens from a string at index and returns the index + 1 of where it ends, falsy on failure', function() {
    it('can read a close parens at index 1', function() {
      const string = '0)'
      const i = 1
      assert(util.readClose(string, i))
    }),
    it('cannot read no open parens', function() {
      const string = 'a'
      const i = 0
      assert.isNotOk(util.readClose(string, i))
    }),
    it('cannot read nothing', function() {
      const string = ''
      const i = 0
      assert.isNotOk(util.readClose(string, i))
    })
  })
})

describe('util.readVector', function() {
  describe('reads a vector repr, return the index of the end + 1 and a list that represents the vector, falsy on failure', function() {
    it('can read a well formed vector', function() {
      const vector = '[1,2,3]'
      const l = List([7, List([F(1), F(2), F(3)])])
      assert(util.readVector(vector, 0).equals(l))
    }),
    it('can read a well formed vector with fractions', function() {
      const vector = '[1/2,2/3,123/456]'
      const l = List([17, List([F(1, 2), F(2, 3), F(123, 456)])])
      assert(util.readVector(vector, 0).equals(l))
    })
  })
})

describe('util.readMatrix', function() {
  describe('reads a matirx repr, return the list that represents the matrix, falsy on failure', function() {
    it('can read a well formed matrix', function() {

    })
  })
})

describe('util.fractionToString', function() {
  describe('returns a string repr of a fraction', function() {
    it('can stringify a fraction with demoninator 1', function() {
      const fraction = F(50)
      assert(util.fractionToString(fraction) === '50')
    }),
    it('can stringify a negative fraction with demoninator 1', function() {
      const fraction = F(-3)
      assert(util.fractionToString(fraction) === '-3')
    }),
    it('can stringify a fraction with demoninator not 1', function() {
      const fraction = F(1, 50)
      assert(util.fractionToString(fraction) === '1/50')
    }),
    it('can stringify a negative fraction with demnominator not 1', function() {
      const fraction = F(-5, 2)
      assert(util.fractionToString(fraction) === '-5/2')
    })
  })
})

describe('util.stringRepr', function() {
  describe('returns a matrix of stringReprs of the fractions', function() {
    it('can give the string repr of a single element matrix', function() {
      const m = List([List([F(1, 3)])])
      const l = List([List(['1/3'])])
      assert(util.stringRepr(m).equals(l))
    }),
    it('can give the strng repr of a 2x2 matrix', function() {
      const l = List([List(['0', '1']),
                      List(['2', '3'])])
      assert(util.stringRepr(m.s22).equals(l))
    })
  })
})

describe('util.maxLengthOfStringRepr', function() {
  describe('gives the max length of all the string reprs of the fractions within a matrix', function() {
    it('can give the MLF of a matrix with a single entry', function() {
      const m = List([List(['-1/2'])])
      const l = List([4])
      assert(util.maxLengthOfStringRepr(m).equals(l))
    }),
    it('can giv ethe MLF of a 2x2 matrix', function() {
      const m = List([List(['1', '2']),
                      List(['33', '-1/15'])])
      const l = List([2, 5])
      assert(util.maxLengthOfStringRepr(m).equals(l))
    }),
    it('edge case 1', function() {
      const m = List([List(['1', '2', '3/4']),
                      List(['4', '4', '4'])])
      const l = List([1, 1, 3])
      assert(util.maxLengthOfStringRepr(m).equals(l))
    })
  })
})

describe('util.matrixToStringList', function() {
  describe('gives a list of vector reprs of a matrix', function() {
    it('can give a list of vector reprs of a single element matrix', function() {
      const l = List(['[ 1 ]'])
      assert(util.matrixToStringList(m.i11).equals(l))
    }),
    it('can give a list of vector reprs of a 2x3 matrix', function() {
      const l = List(['[ -1  2    3 ]', '[  4  5  6/7 ]'])
      const m = List([List([F(1), F(2), F(3)]),
                      List([F(4), F(5), F(6/7)])])
      assert(util.matrixToStringList(m).equals(l))
    })
  })
})

describe('util.arrayVectorEquals', function() {
  describe('gives array vector equality of two vectors', function() {
    it('', function() {
      const v = [F(1), F(2), F(3)]
      const v2 = [F(1), F(2), F(3)]
      assert(util.arrayVectorEquals(v, v2))
    }),
    it('', function() {
      const v = [F(1), F(2), F(3)]
      const v2 = [F(1), F(2), F(4)]
      assert.isNotOk(util.arrayVectorEquals(v, v2))
    })
  })
})

describe('util.arrayMatrixEquals', function() {
  describe('gives matrix vector equality of two matrices', function() {
    it('', function() {
      const m = [[F(1), F(2), F(3)],
                 [F(4), F(5), F(6)],
                 [F(7), F(8), F(9)]]
      const m2 = [[F(1), F(2), F(3)],
                  [F(4), F(5), F(6)],
                  [F(7), F(8), F(9)]]
      assert(util.arrayMatrixEquals(m, m2))
    }),
    it('', function() {
      const m = [[F(1), F(2), F(3)],
                 [F(4), F(5), F(6)],
                 [F(7), F(8), F(9)]]
      const m2 = [[F(1), F(2), F(3)],
                  [F(4), F(5), F(7)],
                  [F(7), F(8), F(9)]]
      assert.isNotOk(util.arrayMatrixEquals(m, m2))
    })
  })
})

describe('util.vectorToArrayVector', function() {
  describe('gives the js Array representation of an Immutable vector', function() {
    it('can give ... for a single element vector', function() {
      const v = List([F(1)])
      const l = [F(1)]
      assert(util.arrayVectorEquals(util.vectorToArrayVector(v), l))
    }),
    it('can give ... for a length 3 vector', function() {
      const v = List([F(1), F(2), F(3)])
      const l = [F(1), F(2), F(3)]
      assert(util.arrayVectorEquals(util.vectorToArrayVector(v), l))
    })
  })
})

describe('util.matrixToArrayMatrix', function() {
  describe('gives the js Array representation of an Immutable matrix', function() {
    it('can give ... for a single element vector', function() {
      const mat = m.i11
      const l = [[1]]
      assert(util.arrayMatrixEquals(util.matrixToArrayMatrix(mat), l))
    }),
    it('can give ... for a 3x3 vector (m.s33)', function() {
      const mat = m.s33
      const l = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
      assert(util.arrayMatrixEquals(util.matrixToArrayMatrix(mat), l))
    })
  })
})
