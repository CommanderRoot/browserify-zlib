/* eslint-env mocha */
'use strict'

// Test unzipping a gzip file that contains multiple concatenated "members"
const common = require('./common')
const assert = require('assert')
const zlib = require('../')

describe.skip('zlib - from concatenated gzip', function () {
  it('works', function (done) {
    const data = Buffer.concat([
      zlib.gzipSync('abc'),
      zlib.gzipSync('def')
    ])

    assert.equal(zlib.gunzipSync(data).toString(), 'abcdef')

    zlib.gunzip(data, common.mustCall((err, result) => {
      assert.ifError(err)
      assert.equal(result, 'abcdef', 'result should match original string')
      done()
    }))
  })
})
