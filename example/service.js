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

var puts = require('sys').puts;
var pb = require('protobuf_for_node');
var pwd = require('example/service');

var entries = pwd.pwd.GetEntries({});
puts(JSON.stringify(entries));

// Alternatively, you can run callback-style. Such an invocation is
// automatically placed on the eio thread pool. You need to do this
// either a) if your service implementation is synchronous but CPU
// intensive and would block node for too long OR b) if your service
// implementation is asynchronous (calls done->Run() only after the
// service method returns).
pwd.pwd.GetEntries({}, function(entries) {
    // This happens after the last line.
    puts(JSON.stringify(entries));
});
puts("Getting entries asynchronously ...");
