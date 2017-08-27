const assert = require('chai').assert
const describe = require('mocha').describe
const it = require('mocha').it
const v = require('../../resources').vectors
const F = require('mathjs').fraction
const List = require('immutable').List
const dot = require('../../src').vn.dot
