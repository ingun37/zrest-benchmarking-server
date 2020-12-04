import * as grpc from "grpc";
import * as proto from "../protocol/protocol_grpc_pb";
import * as pb from "../protocol/protocol_pb";
import * as R from "fp-ts/Record";
import { pipe } from "fp-ts/lib/function";
import { Measurement, Result, benchmark } from "zrest-benchmarker";
import { URL } from "url";
import * as E from "fp-ts/Either";
import {Either} from "fp-ts/Either";
import * as T from "fp-ts/Tuple";
import * as A from "fp-ts/Array";
import {tupled} from "fp-ts/function";

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
function toURL(str:string):E.Either<string, URL> {
  try {
    return E.right(new URL(str));
  } catch (error) {
    return E.left("failed to parse url: " + str);
  }
}
function biSequence<E,A,B>(x:Either<E,A>, y:Either<E,B>):Either<E,[A,B]> {
  const aa = T.sequence(E.either)([x,y])
  const bb = pipe(aa, E.map(T.swap));
  const cc = pipe(bb, E.map(T.sequence(E.either)));
  const dd = E.flatten(cc);
  const ee = pipe(dd, E.map(T.swap));
  return ee;
}
class GRPCServer implements proto.IGreeterServer {
  benchmark: grpc.handleUnaryCall<pb.BenchmarkInfo, pb.Result> = (x, y) => {
    try {
      const maybeLibURL = toURL(x.request.getLiburl());
      const maybeZrestURLs = A.sequence(E.either)(x.request.getModelurlsList().map(toURL));
      const maybeTuple = biSequence(maybeLibURL, maybeZrestURLs);
      const final = pipe(maybeTuple, E.map(tupled(benchmark)));
      pipe(final, E.fold(
        reason => y({name: "Failed to parse url", message: reason}, null),
        resultTask => {
          resultTask
            .then(encodeResult)
            .then(result => y(null,result))
            .catch((err)=>y(err, null));
        },
      ));  
    } catch (error) {
      y(error, null);
    }
  };
}

export function startServer() {
  var server = new grpc.Server();
  server.addService<proto.IGreeterServer>(proto.GreeterService, new GRPCServer());
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
}
