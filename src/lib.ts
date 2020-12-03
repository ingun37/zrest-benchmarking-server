import * as grpc from "grpc";
import * as proto from "../protocol/protocol_grpc_pb";
import * as pb from "../protocol/protocol_pb";
import * as R from "fp-ts/Record";
import { pipe } from "fp-ts/lib/function";
import { Measurement, Result, benchmark } from "zrest-benchmarker";
import { URL } from "url";

function encodeMeasurement(m: Measurement): pb.Measurement {
  const out = new pb.Measurement();
  out.setUnit(m.unit);
  out.setValue(m.value);
  return out;
}
function encodeMeasurementTable(table: Record<string, Measurement>): pb.MeasurementTable {
  return pipe(
    table,
    R.reduceRightWithIndex(new pb.MeasurementTable(), (k, a, b) => {
      b.getMeasurementtableMap().set(k, encodeMeasurement(a));
      return b;
    })
  );
}
function encodeResult(result: Result): pb.Result {
  return pipe(
    result,
    R.reduceRightWithIndex(new pb.Result(), (k, a, b) => {
      b.getResultMap().set(k, encodeMeasurementTable(a));
      return b;
    })
  );
}
class GRPCServer implements proto.IGreeterServer {
  benchmark: grpc.handleUnaryCall<pb.BenchmarkInfo, pb.Result> = (x, y) => {
    var libURL: URL;
    var zrestURLs: URL[];
    try {
      libURL = new URL(x.request.getLiburl());
      zrestURLs = x.request.getModelurlsList().map((x) => {
        try {
          return new URL(x);
        } catch (error) {
          y({ name: "cannot parse url", message: x }, null);
          throw error;
        }
      });
    } catch (error) {
      y({ name: "cannot parse url", message: x.request.getLiburl() }, null);
      throw error;
    }

    benchmark(libURL, zrestURLs).then((result) => y(null, encodeResult(result)));
  };
}

export function startServer() {
  var server = new grpc.Server();
  server.addService<proto.IGreeterServer>(proto.GreeterService, new GRPCServer());
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
}
