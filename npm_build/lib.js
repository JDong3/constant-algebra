'use strict';

var List = require('immutable').List;
var F = require('mathjs').fraction;

var EMPTY_LIST = List();
var ZERO = F(0);

var lib = {

  mb: {
    isIdentity: function isIdentity(matrix) {
      return lib.mb.isSquare(matrix) && lib.mb.isIdentityGivenisSquare(matrix);
    },
    isIdentityGivenisSquare: function isIdentityGivenisSquare(matrix) {
      return matrix.every(function (vector, row) {
        return vector.every(function (element, column) {
          return row !== column && element.equals(F(0)) || row === column && element.equals(F(1));
        });
      });
    },
    isSquare: function isSquare(matrix) {
      return lib.mn.rows(matrix) === lib.mn.columns(matrix);
    },
    sameSize: function sameSize(matrix, matrix2) {
      return lib.mn.rows(matrix) === lib.mn.rows(matrix2) && lib.mn.columns(matrix) === lib.mn.columns(matrix2);
    }
  },
  mm: {
    add: function add(matrix, matrix2) {
      return matrix.map(function (vector, row) {
        return vector.map(function (element, column) {
          return element.add(matrix2.get(row).get(column));
        });
      });
    },
    adjugate: function adjugate(matrix) {
      return lib.mm.transpose(lib.mm.cofactors(matrix));
    },
    cofactors: function cofactors(matrix) {
      return matrix.map(function (vector, row) {
        return vector.map(function (element, column) {
          return lib.mn.cofactor(matrix, row, column);
        });
      });
    },
    inverse: function inverse(matrix) {
      return lib.mm.scale(lib.mm.adjugate(matrix, F(1, lib.mn.det(matrix))));
    },
    minor: function minor(matrix, row, column) {
      return matrix.delete(row).map(function (vector) {
        return vector.delete(column);
      });
    },
    mul: function mul(m1, m2) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var res = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EMPTY_LIST;

      if (i >= m1.size) {
        return res;
      } else {
        var update = res.push(lib.mm.subMul(m1.get(i), m2));
        return lib.mm.mul(m1, m2, i + 1, update);
      }
    },
    subMul: function subMul(v, m) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var res = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EMPTY_LIST;

      if (i >= m.get(0).size) {
        return res;
      } else {
        var update = res.push(lib.vn.dot(v, lib.mv.column(m, i)));
        return lib.mm.subMul(v, m, i + 1, update);
      }
    },
    rowAdd: function rowAdd(m, r1, r2) {
      var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return m.set(r1, lib.mm.rowAfterAdding(m, r1, r2, n));
    },
    rowAfterAdding: function rowAfterAdding(m, r1, r2) {
      var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      return lib.vv.add(m.get(r1), lib.vv.scale(m.get(r2), n));
    },
    rowScale: function rowScale(m, r) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return m.set(r, lib.vv.scale(m.get(r), n));
    },
    rowSwap: function rowSwap(m, r1, r2) {
      var step1 = m.set(r1, m.get(r2));
      var step2 = step1.set(r2, m.get(r1));
      return step2;
    },
    rref: function rref(m) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var pivotRow = lib.mm.pivot(m, r, c);
      if (c >= m.get(0).size) {
        return m;
      } else if (pivotRow !== undefined) {
        // step1: scale the the pivot to have a value of 1
        var step1 = lib.mm.rowScale(m, pivotRow, m.get(pivotRow).get(c).inverse());
        // step2: swap the row with the pivot and the row you are trying to rrefify
        var step2 = lib.mm.rowSwap(step1, pivotRow, r);
        // step3: use row addition to make the column that you are trying to rrefify
        //   be the only cell that has a non-zero value
        var toApplyPivot = lib.mm.applyPivot(step2, r, c);
        // step4: attempty to rrefify the next column and row
        return lib.mm.rref(toApplyPivot, r + 1, c + 1);
      } else {
        return lib.mm.rref(m, r, c + 1);
      }
    },
    /**
     * finds a pivot for a column of a matrix, starting the search from a row
     * @param {List} m: is a matrix representation
     * @param {Number} c: is the column that you want to find a pivot for
     * @param {Number} r: is the row that you want to start the search at
     * @return the first row that is on or after index r, on which a pivot for column
     *   c exists
     */
    pivot: function pivot(m, r, c) {
      if (c >= lib.mn.columns(m) || r >= lib.mn.rows(m)) {
        return undefined;
      } else if (!m.get(r).get(c).equals(0)) {
        return r;
      } else {
        return lib.mm.pivot(m, r + 1, c);
      }
    }, // find a pivot for the nth column, starting from row r
    applyPivot: function applyPivot(m, r, c) {
      var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      if (i >= m.size) {
        return m;
      } else if (r !== i) {
        var update = lib.mm.rowAdd(m, i, r, m.get(i).get(c).neg());
        return lib.mm.applyPivot(update, r, c, i + 1);
      } else {
        return lib.mm.applyPivot(m, r, c, i + 1);
      }
    },
    sub: function sub(matrix, matrix2) {
      return matrix.map(function (vector, row) {
        return vector.map(function (element, column) {
          return element.sub(matrix2.get(row).get(column));
        });
      });
    },
    transpose: function transpose(matrix) {
      return matrix.get(0).map(function (element, index) {
        return matrix.map(function (vector) {
          return vector.get(index);
        });
      });
    }
  },
  mn: {
    antiTrace: function antiTrace(matrix) {
      return lib.mv.antiDiagonal(matrix).reduce(function (a, b) {
        return a.add(b);
      });
    },
    cofactor: function cofactor(matrix, row, column) {
      return F(-1).pow(column + row).mul(matrix.get(row).get(column)).mul(lib.mn.det(lib.mm.minor(matrix, row, column)));
    },
    columns: function columns(matrix) {
      return matrix.get(0).size;
    },
    det: function det(matrix) {
      if (matrix.size === 1) {
        return matrix.get(0).get(0);
      } else {
        return lib.mn.sumRowCofactors(matrix, 0);
      }
    },
    sumRowCofactors: function sumRowCofactors(matrix, row) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var res = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ZERO;

      if (i >= lib.mn.columns(matrix)) {
        return res;
      } else {
        //console.log(lib.mn.cofactor(matrix, row, i))
        return lib.mn.sumRowCofactors(matrix, row, i + 1, res.add(lib.mn.cofactor(matrix, row, i)));
      }
    },
    mulAntiTrace: function mulAntiTrace(matrix) {
      return lib.mv.antiDiagonal(matrix).reduce(function (a, b) {
        return a.mul(b);
      });
    },
    mulTrace: function mulTrace(matirx) {
      return lib.mv.diagonal(matrix).reduce(function (a, b) {
        return a.mul(b);
      });
    },
    rows: function rows(matrix) {
      return matrix.size;
    },
    trace: function trace(matrix) {
      return lib.mv.diagonal(matrix).reduce(function (a, b) {
        return a.add(b);
      });
    }
  },
  mv: {
    antiDiagonal: function antiDiagonal(matrix) {
      return matrix.map(function (vector, row) {
        return vector.get(-(row + 1));
      });
    },
    column: function column(matrix, n) {
      return matrix.map(function (vector) {
        return vector.get(n);
      });
    },
    diagonal: function diagonal(matrix) {
      return matrix.map(function (vector, row) {
        return vector.get(row);
      });
    },
    row: function row(matrix, n) {
      return matrix.get(n);
    }
  },

  vb: {
    sameSize: function sameSize(v1, v2) {
      return v1.size === v2.size;
    }
  },

  vn: {
    dot: function dot(vector, vector2) {
      return vector.map(function (element, n) {
        return element.mul(vector2.get(n));
      }).reduce(function (a, b) {
        return a.add(b);
      });
    }
  },

  vv: {
    add: function add(vector, vector2) {
      return vector.map(function (element, n) {
        return element.add(vector2.get(n));
      });
    },
    scale: function scale(vector, amount) {
      return vector.map(function (element) {
        return element.mul(amount);
      });
    },
    sub: function sub(vector, vector2) {
      return vector.map(function (element, n) {
        return element.sub(vector2.get(n));
      });
    }
  }
};

module.exports = lib;