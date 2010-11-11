build:
	@node-waf configure build

install:
	@mkdir -p ~/.node_libraries && cp ./build/default/protobuf.node ./
  
all: build install

clean:
	@rm -rf ./build
