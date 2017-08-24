const List = require('immutable').List
const matrixMap = (fun, m, c=0, r=0, res=List()) => {
    if(r >= m.size) {
      return res
    } else {
      res.push(m.get(r).map())
    }
}
