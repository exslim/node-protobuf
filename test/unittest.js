var assert = require('assert'),
    puts = require('sys').puts,
    read = require('fs').readFileSync,
    Schema = require('protobuf_for_node').Schema;

var T = new Schema(read('test/unittest.desc'))['protobuf_unittest.TestAllTypes'];
assert.ok(T, 'type in schema');
var golden = read('test/golden_message');
var message = T.parse(golden);
assert.ok(message, 'parses message');  // currently rather crashes 

assert.equal(T.serialize(message).inspect(), golden.inspect(), 'roundtrip');

message.ignored = 42;
assert.equal(T.serialize(message).inspect(), golden.inspect(), 'ignored field');

assert.throws(function() {
  T.parse(new Buffer('invalid'));
}, Error, 'Should not parse');

assert.strictEqual(T.parse(
  T.serialize({
    optionalInt32: '3'
  })
).optionalInt32, 3, 'Number conversion');

assert.strictEqual(T.parse(
  T.serialize({
    optionalInt32: ''
  })
).optionalInt32, 0, 'Number conversion');

assert.strictEqual(T.parse(
  T.serialize({
    optionalInt32: 'foo'
  })
).optionalInt32, 0, 'Number conversion');

assert.strictEqual(T.parse(
  T.serialize({
    optionalInt32: {}
  })
).optionalInt32, 0, 'Number conversion');

assert.strictEqual(T.parse(
  T.serialize({
    optionalInt32: null
  })
).optionalInt32, undefined, 'null');

assert.throws(function() {
  T.serialize({
    optionalNestedEnum: 'foo'
  });
}, Error, 'Unknown enum');

assert.throws(function() {
  T.serialize({
    optionalNestedMessage: 3
  });
}, Error, 'Not an object');

assert.throws(function() {
  T.serialize({
    repeatedNestedMessage: ''
  });
}, Error, 'Not an array');


puts('Success');
