const util = require('..').util
const assert = require('chai').assert

describe('util.readNumber', function() {
  describe('reads a number from a string and return the ending index + 1 of the numbers end, same index if read fails', function() {
      const string = '123'
      const i = 0
      assert.equal(util.readNumber(string, i), 3)
    })
})
