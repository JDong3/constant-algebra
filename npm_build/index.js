'use strict';

var src = require('./src');

var mb = src.lib.mb;
var mm = src.lib.mm;
var mn = src.lib.mn;
var mv = src.lib.mv;
var vb = src.lib.vb;
var vn = src.lib.vn;
var vv = src.lib.vv;
var vectors = src.res.vectors;
var matrices = src.res.matrices;
var util = src.util;

var is = src.ver.is;
var mbv = src.ver.mbv;
var mmv = src.ver.mmv;
var mnv = src.ver.mnv;
var mvv = src.ver.mvv;
var vbv = src.ver.vbv;
var vnv = src.ver.vnv;
var vvv = src.ver.vvv;

module.exports = {
  is: is,
  mb: mb,
  mm: mm,
  mn: mn,
  mv: mv,
  vb: vb,
  vn: vn,
  vv: vv,
  vectors: vectors,
  matrices: matrices,
  util: util,
  mbv: mbv,
  mmv: mmv,
  mnv: mnv,
  mvv: mvv,
  vbv: vbv,
  vnv: vnv,
  vvv: vvv
};
