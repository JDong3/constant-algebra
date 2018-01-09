const List = require('immutable').List
const F = require('fraction.js')

const res = {
  v: {
    z1: List([F(0)]),
    z2: List([F(0), F(0)]),
    z3: List([F(0), F(0), F(0)]),

    o1: List([F(1)]),
    o2: List([F(1), F(1)]),
    o3: List([F(1), F(1), F(1)]),

    s1: List([F(0)]),
    s2: List([F(0), F(1)]),
    s3: List([F(0), F(1), F(2)])
  },
  m: {
    // zero matrices
    z11: List([List([F(0)])]),
    z12: List([List([F(0), F(0)] )]),
    z13: List([List([F(0), F(0), F(0)])]),
    z21: List([List([F(0)]),
               List([F(0)])]),
    z22: List([List([F(0), F(0)]),
               List([F(0), F(0)])]),
    z23: List([List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)])]),
    z32: List([List([F(0), F(0)]),
               List([F(0), F(0)]),
               List([F(0), F(0)])]),
    z31: List([List([F(0)]),
               List([F(0)]),
               List([F(0)])]),
    z33: List([List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)])]),
    z34: List([List([F(0), F(0), F(0), F(0)]),
               List([F(0), F(0), F(0), F(0)]),
               List([F(0), F(0), F(0), F(0)])]),
    z43: List([List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)]),
               List([F(0), F(0), F(0)])]),
    // identity matrices
    i11: List([List([F(1)])]),
    i22: List([List([F(1), F(0)]),
               List([F(0), F(1)])]),
    i33: List([List([F(1), F(0), F(0)]),
               List([F(0), F(1), F(0)]),
               List([F(0), F(0), F(1)])]),
    s13: List([List([F(0), F(1), F(2)])]),
    s22: List([List([F(0), F(1)]),
               List([F(2), F(3)])]),
    s33: List([List([F(0), F(1), F(2)]),
               List([F(3), F(4), F(5)]),
               List([F(6), F(7), F(8)])]),
    s31: List([List([F(0)]),
              List([F(1)]),
              List([F(2)])]),
    s34: List([List([F(0), F(1), F(2), F(3)]),
               List([F(4), F(5), F(6), F(7)]),
               List([F(8), F(9), F(10), F(11)])]),
    s43: List([List([F(0), F(1), F(2)]),
               List([F(3), F(4), F(5)]),
               List([F(6), F(7), F(8)]),
               List([F(9), F(10), F(11)])]),
    o11: List([List([F(1)])]),
    o33: List([List([F(1), F(1), F(1)]),
               List([F(1), F(1), F(1)]),
               List([F(1), F(1), F(1)])])
  }
}

module.exports = res
