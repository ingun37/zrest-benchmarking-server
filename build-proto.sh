#!/bin/zsh

BASEDIR=$(dirname "$0")
PROTO_DIR=$BASEDIR/
PROTO_PATH=$PROTO_DIR/protocol.proto
PROTO_DEST=$BASEDIR/protocol
NPM_BIN=$BASEDIR/node_modules/.bin

# JavaScript code generation
npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=${PROTO_DEST} \
    --plugin=protoc-gen-grpc=$NPM_BIN/grpc_tools_node_protoc_plugin \
    -I $PROTO_DIR \
    $PROTO_PATH

# TypeScript code generation
npx grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=$NPM_BIN/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I $PROTO_DIR \
    $PROTO_PATH