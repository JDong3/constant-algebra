var lf = require('./list_functions.js');
/**
 * gets the column vectors of m as a new matrix object
 * @param  {[type]} l             [description]
 * @param  {Number} [n=0]         [description]
 * @param  {[type]} [ret=Array()] [description]
 * @return {[type]}               [description]
 */
let columns = (m, n=0, ret=Array()) => {
  if (n === m.length - 1) {
    ret.push(getColumn(m, n));
    return ret;
  } else {
    ret.push(getColumn(m, n));
    return columns(m, n+1, ret);
  }
}
