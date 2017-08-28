const scale = require('../vv').scale
const add = require('../vv').add

const rowAdd = (m, r1, r2, n=1) => (
  m.set(r1, rowAfterAdding(m, r1, r2, n)))

const rowAfterAdding = (m, r1, r2, n=1) => (
  add(m.get(r1), scale(m.get(r2), n)))

module.exports = rowAdd
