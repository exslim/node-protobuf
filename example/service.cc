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

#include <pwd.h>

#include "../protobuf_for_node.h"
#include "service.pb.h"
#include "v8.h"

extern "C" void init(v8::Handle<v8::Object> target) {
  // Look Ma - no v8 api!
  protobuf_for_node::ExportService(target, "pwd", new (class : public pwd::Pwd {
    virtual void GetEntries(google::protobuf::RpcController*,
			    const pwd::EntriesRequest* request,
			    pwd::EntriesResponse* response,
			    google::protobuf::Closure* done) {
      struct passwd* p;
      while ((p = getpwent())) {
	pwd::Entry* e = response->add_entry();
	e->set_name(p->pw_name);
	e->set_uid(p->pw_uid);
	e->set_gid(p->pw_gid);
	e->set_home(p->pw_dir);
	e->set_shell(p->pw_shell);
      }
      setpwent();
      done->Run();
    }
  }));
}
