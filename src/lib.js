const lib = {
  is: {
    isMatrix: (m) => (
      List.isList(m) &&
      m.every((element) => (
        lib.is.isVector(element))) &&
      m.every((element) => (
        sameSize(element, m.get(0))))),

    isVector: (v) => (
      List.isList(v) &&
      v.size > 0 &&
      v.every(lib.is.isFraction)),

    isFraction: (element) => (
      element.n !== undefined &&
      element.d !== undefined &&
      element.s !== undefined)
  },

  mb: {

  },

  mm: {

  },

  mn: {

  },

  mv: {

  },

  vb: {

  },

  vn: {

  },

  vv: {

  }
}
