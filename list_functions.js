/**
 * max element finder
 * @param  {Array} l is an Array of numbers
 * @return {Number}   the max element in the list
 */
let max = (l) => {
  let mMath = (a, b) => (
    Math.max(a, b));
    return l.reduce(mMath);
};
/**
 * nth column generator of a 2d list of numbers
 * @param  {Array} l is an array of arrays of numbers
 * @param  {Number} n is index of the column you want to get, n < l.length
 * @return {Array}   nth column of
 */
let getColumn = (l, n) => {
  return l.map((l) => (l[n]));
}
