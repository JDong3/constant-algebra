'use strict';

var F = require('mathjs').fraction;
var List = require('immutable').List;

var closeParens = List([')', ']', '}']);
var dividers = List([',']);
var emptyCharAt = '';
var EMPTY_LIST = List();
var leftPad = require('left-pad');
var numbers = List(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
var openParens = List(['(', '[', '{']);
var slash = '/';

var util = {
  readNumber: function readNumber(string, i) {
    var res = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (!(numbers.includes(string.charAt(i)) || string.charAt(i) === slash)) {
      var parsedNumber = util.parseNumber(res);
      if (!parsedNumber) {
        return undefined;
      } else {
        return List([i, parsedNumber]);
      }
    } else {
      return util.readNumber(string, i + 1, res + string.charAt(i));
    }
  },
  readDiv: function readDiv(string, i) {
    if (dividers.includes(string.charAt(i))) {
      return true;
    } else {
      return false;
    }
  },
  readOpen: function readOpen(string, i) {
    if (openParens.includes(string.charAt(i))) {
      return true;
    } else {
      return false;
    }
  },
  readClose: function readClose(string, i) {
    if (closeParens.includes(string.charAt(i))) {
      return true;
    } else {
      return false;
    }
  },
  readVectorContents: function readVectorContents(string, i) {
    var divNext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var res = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EMPTY_LIST;

    //console.log('string:', string, 'i:', i, 'divNext:', divNext, 'res:', res)
    if ((divNext && res.size > 0 || res.size === 0) && util.readClose(string, i)) {
      return List([i, res]);
    } else if (!divNext) {
      var result = util.readNumber(string, i);
      if (!result) {
        return undefined;
      } else {
        return util.readVectorContents(string, result.get(0), true, res.push(result.get(1)));
      }
    } else {
      var _result = util.readDiv(string, i);
      if (!_result) {
        return undefined;
      } else {
        return util.readVectorContents(string, i + 1, false, res);
      }
    }
  },
  readVector: function readVector(string, i) {
    var step1 = util.readOpen(string, i);
    if (!step1) {
      return undefined;
    }
    var step2 = util.readVectorContents(string, i + 1);
    if (!step2) {
      return undefined;
    }
    var step3 = util.readClose(string, step2.get(0));
    if (!step3) {
      return undefined;
    }
    return List([step2.get(0) + 1, step2.get(1)]);
  },
  readMatrixContents: function readMatrixContents(string, i) {
    var divNext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var res = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EMPTY_LIST;

    //console.log('string:', string, 'i:', i, 'devNext:', divNext, 'res:', res)
    if ((divNext && res.size > 0 || res.size === 0) && util.readClose(string, i)) {
      return res;
    } else if (!divNext) {
      var result = util.readVector(string, i);
      if (!result) {
        return undefined;
      } else {
        return util.readMatrixContents(string, result.get(0), true, res.push(result.get(1)));
      }
    } else {
      var _result2 = util.readDiv(string, i);
      if (!_result2) {
        return undefined;
      } else {
        return util.readMatrixContents(string, i + 1, false, res);
      }
    }
  },
  readMatrix: function readMatrix(string, i) {
    var step1 = util.readOpen(string, i);
    if (!step1) {
      return undefined;
    }
    var step2 = util.readMatrixContents(string, step1);
    if (!step2) {
      return undefined;
    }
    return step2;
  },
  removeSpaces: function removeSpaces(string) {
    return List(string.split('')).filter(function (element) {
      return element !== ' ';
    }).reduce(function (a, b) {
      return a + b;
    }, '');
  },
  parseNumber: function parseNumber(string) {
    var invalidString = string.length === 0 || string.charAt(0) === slash || string.charAt(string.length - 1) === slash || List(string.split('')).filter(function (element) {
      return element === slash;
    }).size > 1;
    if (!invalidString) {
      var indexOfSlash = string.indexOf(slash);
      if (indexOfSlash == -1) {
        return F(parseInt(string, 10));
      } else {
        return F(parseInt(string.slice(0, indexOfSlash), 10), parseInt(string.slice(indexOfSlash + 1, string.length), 10));
      }
    } else {
      return undefined;
    }
  },
  parseMatrix: function parseMatrix(string) {
    return util.readMatrix(util.removeSpaces(string));
  },
  matrixToStringList: function matrixToStringList(matrix) {
    var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';

    var matrixOfStringRepr = util.stringRepr(matrix);
    var maxLength = util.maxLengthOfStringRepr(matrixOfStringRepr);
    return matrixOfStringRepr.map(function (vectorOfStringRepr, index) {
      return '[ ' + vectorOfStringRepr.reduce(function (a, b, i) {
        return leftPad(a, maxLength.get(i)) + padding + leftPad(b, maxLength.get(i));
      }) + ' ]';
    });
  },
  maxLengthOfStringRepr: function maxLengthOfStringRepr(matrix) {
    return matrix.get(0).map(function (element, index) {
      return matrix.map(function (vector) {
        return vector.get(index);
      });
    }).map(function (vector) {
      return vector.reduce(function (a, b) {
        if (a.length > b.length) {
          return a;
        } else {
          return b;
        }
      }, '');
    }).map(function (element) {
      return element.length;
    });
  },
  stringRepr: function stringRepr(matrix) {
    return matrix.map(function (vector) {
      return vector.map(function (element) {
        return util.fractionToString(element);
      });
    });
  },
  fractionToString: function fractionToString(fraction) {
    if (fraction.d === 1) {
      return (fraction.s * fraction.n).toString();
    } else {
      return (fraction.s * fraction.n).toString() + '/' + fraction.d.toString();
    }
  },
  vectorToArrayVector: function vectorToArrayVector(vector) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var res = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (i >= vector.size) {
      return res;
    } else {
      res.push(vector.get(i));
      return util.vectorToArrayVector(vector, i + 1, res);
    }
  },
  matrixToArrayMatrix: function matrixToArrayMatrix(matrix) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var res = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (i >= matrix.size) {
      return res;
    } else {
      res.push(util.vectorToArrayVector(matrix.get(i)));
      return util.matrixToArrayMatrix(matrix, i + 1, res);
    }
  },
  arrayVectorEquals: function arrayVectorEquals(vector, vector2) {
    return vector.length === vector2.length && vector.every(function (element, i) {
      return element.equals(vector2[i]);
    });
  },
  arrayMatrixEquals: function arrayMatrixEquals(matrix, matrix2) {
    return matrix.length === matrix2.length && matrix[0].length === matrix2[0].length && matrix.every(function (vector, i) {
      return util.arrayVectorEquals(vector, matrix2[i]);
    });
  }
};
module.exports = util;