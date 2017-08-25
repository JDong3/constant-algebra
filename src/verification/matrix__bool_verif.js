const isSquareDefined = (m) => (
  isMatrix(m))

const isIdentityDefined = (m) => (
  isMatrix(m))

const sameSizeDefined = (m1, m2) => (
  isMatrix(m1) && isMatrix(m2))

moduls.exports = {
  isSquareDefined, isIdentityDefined, sameSizeDefined
}
