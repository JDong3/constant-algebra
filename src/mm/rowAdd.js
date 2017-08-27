

const rowAdd = (m, r1, r2, n=1) => (
  m.set(r1, rowAfterAdding(m, r1, r2, n)))

const rowAfterAdding = (m, r1, r2, n=1) => (
  vv.add(m.get(r1), vv.scale(m.get(r2), n)))
