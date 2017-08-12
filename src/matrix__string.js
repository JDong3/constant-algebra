let ls = require('./list_functions.js')
let mm = require('./matrix__matrix.js')
let lp = require('./dependencies/index.js')

/**
 * blah.
 * @param {Matrix} m is a Matrix obj
 * @return {string}
 */
let str = (m) => {
    let lengthList = []
    let toStringLength = (e) => (e.toString().length)
    let mathMax = (a, b) => (Math.max(a, b))
    let str = "";
    for (i = 0; i < m.length; i++) {
      let max = ls.getColumn(m, i).map(toStringLength)
                                  .reduce(mathMax)
      lengthList.push(max)
    }
    for (i = 0; i < m.length; i++) {
      str += "["
      for (j = 0; j < m[0].length - 1; j++) {
        str += lp.leftPad(m[i][j].toString(), lengthList[j]) + " "
      }
      str += lp.leftPad(m[i][m[0].length - 1], lengthList[m[0].length - 1]) + "]\n"
    }
  return str
}
