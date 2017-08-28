const cofactor = (m, c, r) => (
  F(-1).pow(c+r).mul(det(minor(m, c, r))))
