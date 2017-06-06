/**
 * verifys that matrix is valid, ie. matrix represents a rectangular array of
 * ofjects
 * @param  {Matrix} m is a Matrix object
 * @return {bool}   whether the Matrix represents a rectangular array of
 *   objects
 */
let verify = (m) => {
  let sameLength = (length, arr) => (arr.length == length);
  return m.data.reduce(sameLength, m.data[0].length);
};

let isSquare = () => ();
