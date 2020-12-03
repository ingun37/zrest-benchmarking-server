// package: protocol
// file: protocol.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as protocol_pb from "./protocol_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    benchmark: IGreeterService_IBenchmark;
}

interface IGreeterService_IBenchmark extends grpc.MethodDefinition<protocol_pb.BenchmarkInfo, protocol_pb.Void> {
    path: "/protocol.Greeter/Benchmark";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protocol_pb.BenchmarkInfo>;
    requestDeserialize: grpc.deserialize<protocol_pb.BenchmarkInfo>;
    responseSerialize: grpc.serialize<protocol_pb.Void>;
    responseDeserialize: grpc.deserialize<protocol_pb.Void>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer {
    benchmark: grpc.handleUnaryCall<protocol_pb.BenchmarkInfo, protocol_pb.Void>;
}

export interface IGreeterClient {
    benchmark(request: protocol_pb.BenchmarkInfo, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
    benchmark(request: protocol_pb.BenchmarkInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
    benchmark(request: protocol_pb.BenchmarkInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public benchmark(request: protocol_pb.BenchmarkInfo, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
    public benchmark(request: protocol_pb.BenchmarkInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
    public benchmark(request: protocol_pb.BenchmarkInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.Void) => void): grpc.ClientUnaryCall;
}
