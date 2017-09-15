'use strict';

var lib = require('./lib.js');
var List = require('immutable').List;

var ver = {
  is: {
    isMatrix: function isMatrix(matrix) {
      return List.isList(matrix) && matrix.every(function (element) {
        return ver.is.isVector(element);
      }) && matrix.every(function (element) {
        return lib.vb.sameSize(element, matrix.get(0));
      });
    },
    isVector: function isVector(vector) {
      return List.isList(vector) && vector.size > 0 && vector.every(ver.is.isFraction);
    },
    isFraction: function isFraction(element) {
      return element.n !== undefined && element.d !== undefined && element.s !== undefined;
    }
  },
  mbv: {
    isIdentityDefined: function isIdentityDefined(m) {
      return ver.is.isMatrix(m);
    },
    isSquareDefined: function isSquareDefined(m) {
      return ver.is.isMatrix(m);
    },
    sameSizeDefined: function sameSizeDefined(m1, m2) {
      return ver.is.isMatrix(m1) && ver.is.isMatrix(m2);
    }
  },
  mmv: {
    addDefined: function addDefined(m1, m2) {
      return lib.mb.sameSize(m1, m2);
    },
    adjugateDefined: function adjugateDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    cofactorsDefined: function cofactorsDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    inverseDefined: function inverseDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m) && lib.mn.det(m) !== 0;
    },
    minorDefined: function minorDefined(m, r, c) {
      return ver.is.isMatrix(m) && ver.mvv.rowDefined(r) && ver.mvv.columnDefined(c);
    },
    mulDefined: function mulDefined(m1, m2) {
      return ver.is.isMatrix(m1) && ver.is.isMatrix(m2) && lib.mn.rows(m1) === lib.mn.columns(m2);
    },
    rowAddDefined: function rowAddDefined(m, r1, r2, n) {
      return ver.is.isMatrix(m) && ver.mmv.rowDefined(r1) && ver.mmv.rowDefined(r2) && ver.is.isFraction(n);
    },
    rowScaleDefined: function rowScaleDefined(m, r, n) {
      return ver.is.isMatrix(m) && lib.mmv.rowDefined(r) && ver.is.isFraction(n);
    },
    rowSwapDefined: function rowSwapDefined(m, r1, r2) {
      return ver.is.isMatrix(m) && mmv.rowDefined(r1) && mmv.rowDefined(r2);
    },
    rrefDefined: function rrefDefined(m) {
      return ver.is.isMatrix(m);
    },
    subDefined: function subDefined(m1, m2) {
      return lib.mb.sameSize(m1, m2);
    },
    transposeDefined: function transposeDefined(m) {
      return ver.is.isMatrix(m);
    }
  },
  mnv: {
    antiTraceDefined: function antiTraceDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    cofactorDefined: function cofactorDefined(m, r, c) {
      return ver.is.isMatrix(m) && ver.is.rowDefined(m, r) && ver.is.columnDefined(m, c);
    },
    columnsDefined: function columnsDefined(m) {
      return ver.is.isMatrix(m);
    },
    detDefined: function detDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    mulAntiTraceDefined: function mulAntiTraceDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    mulTraceDefined: function mulTraceDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    rowsDefined: function rowsDefined(m) {
      return ver.is.isMatrix(m);
    },
    traceDefined: function traceDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    }
  },
  mvv: {
    antiDiagonalDefined: function antiDiagonalDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    columnDefined: function columnDefined(m, n) {
      return ver.is.isMatrix(m) && n >= 0 && n <= m.get(0).size - 1;
    },
    diagonalDefined: function diagonalDefined(m) {
      return ver.is.isMatrix(m) && lib.mb.isSquare(m);
    },
    rowDefined: function rowDefined(m, n) {
      return ver.is.isMatrix(m) && n >= 0 && n <= m.size - 1;
    }
  },
  vbv: {
    sameSizeDefined: function sameSizeDefined(v1, v2) {
      return ver.is.isVector(v1) && ver.is.isVector(v2);
    }
  },
  vnv: {
    dotDefined: function dotDefined(v1, v2) {
      return ver.is.isVector(v1) && ver.is.isVector(v2) && lib.vb.sameSize(v1, v2);
    }
  },
  vvv: {
    addDefined: function addDefined(v1, v2) {
      return ver.is.isVector(v1) && ver.is.isVector(v2) && lib.vb.sameSize(v1, v2);
    },
    scaleDefined: function scaleDefined(v, n) {
      return ver.is.isVector(v) && ver.is.isFraction(n);
    },
    subDefined: function subDefined(v1, v2) {
      return ver.is.isVector(v1) && ver.is.isVector(v2) && lib.vb.sameSize(v1, v2);
    }
  }
};

module.exports = ver;