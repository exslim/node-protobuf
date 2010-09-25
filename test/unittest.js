var assert = require('assert'),
    puts = require('sys').puts,
    read = require('fs').readFileSync,
    Schema = require('protobuf_for_node').Schema;

var T = new Schema(read('test/unittest.desc'))['protobuf_unittest.TestAllTypes'];
assert.ok(T, "type in schema");
var golden = read('test/golden_message');
var message = T.parse(golden);
assert.ok(message, "parses message");  // currently rather crashes 

assert.equal(T.serialize(message).inspect(), golden.inspect(), "roundtrip");

message.ignored = 42;
assert.equal(T.serialize(message).inspect(), golden.inspect(), "ignored field");

var parsed = false;
try {
  T.parse(new Buffer('invalid'));
  parsed = true;
} catch(e) {
}
assert.ok(!parsed, "Should not parse");

puts("Success");
