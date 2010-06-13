// Copyright 2010 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

var fs = require('fs');
var pb = require('protobuf_for_node');
var Schema = pb.Schema;
var schema = new Schema(fs.readFileSync('example/feeds.desc'));
var Feed = schema['feeds.Feed'];
schema = null;
var serialized = Feed.serialize({ title: 'Title', ignored: 42 });
var aFeed = Feed.parse(serialized);  

var puts = require('sys').puts;
puts(JSON.stringify(aFeed, null, 2));

Feed.prototype.numEntries = function() {
  return this.entry.length;
};
var aFeed = Feed.parse(Feed.serialize({ entry: [{}, {}] }));
puts(aFeed.numEntries());

var t = Date.now();
for (var i = 0; i < 100000; i++)
  Feed.parse(Feed.serialize({ entry: [{}, {}] }));
puts("Proto: " + (Date.now() - t)/100 + " us / object");

var t = Date.now();
for (var i = 0; i < 100000; i++)
  JSON.parse(JSON.stringify({ entry: [{}, {}] }));
puts("JSON: " + (Date.now() - t)/100 + " us / object");
