const isMatrix = require('./isMatrix.js')
const mb = require('../matrix__bool.js')
const mn = require('../matrix__number.js')


const transposeDefined = (m) => (
  isMatrix(m))

/**
 * checks if addition is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether addition is defined for m1 and m2
 */
const addDefined = (m1, m2) => (
  mb.sameSize(m1, m2))


/**
 * checks if subtraction is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether subtraction is defined for m1 by m2
 */
const subDefined = (m1, m2) => (
  mb.sameSize(m1, m2))


/**
 * checks if multiplication is defined for two matrices
 * @param {List} m1: is a matrix representation
 * @param {List} m2: is a matrix representation
 * @return {Boolean} whether matrix multiplication is defined for m1 my m2
 */
const mulDefined = (m1, m2) => (
  isMatrix(m1) &&
    isMatrix(m2) &&
       mn.rows(m1) === mn.columns(m2))

module.exports = {transposeDefined, addDefined, subDefined, mulDefined}
