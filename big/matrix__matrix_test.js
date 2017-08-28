

describe('mm.cofactors', function() {
  describe('gives the cofactor matrix of the input', function() {
    it('can cofactorize s33', function() {
      const l = List([List([F(0), F(6), F(-6)]),
                      List([F(18), F(48), F(-30)]),
                      List([F(-18), F(-42), F(-24)])])
      assert(mm.cofactors(matrices.s33).equals(l))
    })
  })
})
