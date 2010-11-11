# Copyright 2010 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you
# may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied. See the License for the specific language governing
# permissions and limitations under the License.

import os
import Options
import Logs

srcdir = '.'
blddir = 'build'
VERSION = '0.1'

def set_options(opt):
  opt.tool_options('compiler_cxx')
  opt.add_option('--protobuf_path', action='store', default=None, help='Path to Protobuf library')

def configure(conf):
  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')
  conf.env.PROTOBUF_PATH = Options.options.protobuf_path
  conf.env.DEFAULT_PROTOBUF_PATH = '/usr/local'

  conf.env.append_value('CCFLAGS', ['-O3'])
  conf.env.append_value('CXXFLAGS', ['-O3'])
  if Options.platform == 'darwin':
    conf.env.append_value('LINKFLAGS', ['-undefined', 'dynamic_lookup'])
  if not conf.env.PROTOBUF_PATH:
    Logs.warn("Option --protobuf_path wasn\'t defined. Trying default: %s" % conf.env.DEFAULT_PROTOBUF_PATH)
  conf.env.append_value("CPPPATH_PROTOBUF", "%s/include"%(conf.env.PROTOBUF_PATH))
  conf.env.append_value("LIBPATH_PROTOBUF", "%s/lib"%(conf.env.PROTOBUF_PATH))
  conf.env.append_value("LIB_PROTOBUF", "protobuf")

def build(bld):
  # protobuf_for_node comes as a library to link against for services
  # and an addon to use for plain serialization.
  obj = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  obj.target = 'protobuf'
  obj.source = 'protobuf_for_node.cc'
  obj.uselib = ['NODE', 'PROTOBUF']
