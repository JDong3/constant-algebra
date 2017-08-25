const rowsDefined = (m) => (
  isMatrix(m))

const columnsDefined = (m) => (
  isMatrix(m))

const traceDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

const mulTraceDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

const antiTraceDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

const mulAntiTraceDefined = (m) => (
  isMatrix(m) &&
    isSquare(m))

const detDefined = (m) => (
  isMatrix(m) && isSquare(m))

const cofactorDefined = (m, r, c) => (
  isMatrix(m) &&
    rowDefined(m, r) &&
      columnDefined(m, c))

module.exports = {
  rowsDefined, columnsDefined, traceDefined, mulTraceDefined, antiTraceDefined,
  mulAntiTraceDefined, detDefined, cofactorDefined}
