// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protocol_pb = require('./protocol_pb.js');

function serialize_protocol_BenchmarkInfo(arg) {
  if (!(arg instanceof protocol_pb.BenchmarkInfo)) {
    throw new Error('Expected argument of type protocol.BenchmarkInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_protocol_BenchmarkInfo(buffer_arg) {
  return protocol_pb.BenchmarkInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_protocol_Void(arg) {
  if (!(arg instanceof protocol_pb.Void)) {
    throw new Error('Expected argument of type protocol.Void');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_protocol_Void(buffer_arg) {
  return protocol_pb.Void.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var GreeterService = exports.GreeterService = {
  benchmark: {
    path: '/protocol.Greeter/Benchmark',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.BenchmarkInfo,
    responseType: protocol_pb.Void,
    requestSerialize: serialize_protocol_BenchmarkInfo,
    requestDeserialize: deserialize_protocol_BenchmarkInfo,
    responseSerialize: serialize_protocol_Void,
    responseDeserialize: deserialize_protocol_Void,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
