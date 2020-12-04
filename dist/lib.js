"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const grpc = __importStar(require("grpc"));
const proto = __importStar(require("../protocol/protocol_grpc_pb"));
const pb = __importStar(require("../protocol/protocol_pb"));
const R = __importStar(require("fp-ts/Record"));
const function_1 = require("fp-ts/lib/function");
const zrest_benchmarker_1 = require("zrest-benchmarker");
const url_1 = require("url");
const E = __importStar(require("fp-ts/Either"));
const T = __importStar(require("fp-ts/Tuple"));
const A = __importStar(require("fp-ts/Array"));
const function_2 = require("fp-ts/function");
function encodeMeasurement(m) {
    const out = new pb.Measurement();
    out.setUnit(m.unit);
    out.setValue(m.value);
    return out;
}
function encodeMeasurementTable(table) {
    return function_1.pipe(table, R.reduceRightWithIndex(new pb.MeasurementTable(), (k, a, b) => {
        b.getMeasurementtableMap().set(k, encodeMeasurement(a));
        return b;
    }));
}
function encodeResult(result) {
    return function_1.pipe(result, R.reduceRightWithIndex(new pb.Result(), (k, a, b) => {
        b.getResultMap().set(k, encodeMeasurementTable(a));
        return b;
    }));
}
function toURL(str) {
    try {
        return E.right(new url_1.URL(str));
    }
    catch (error) {
        return E.left("failed to parse url: " + str);
    }
}
function biSequence(x, y) {
    const aa = T.sequence(E.either)([x, y]);
    const bb = function_1.pipe(aa, E.map(T.swap));
    const cc = function_1.pipe(bb, E.map(T.sequence(E.either)));
    const dd = E.flatten(cc);
    const ee = function_1.pipe(dd, E.map(T.swap));
    return ee;
}
class GRPCServer {
    constructor() {
        this.benchmark = (x, y) => {
            try {
                const maybeLibURL = toURL(x.request.getLiburl());
                const maybeZrestURLs = A.sequence(E.either)(x.request.getModelurlsList().map(toURL));
                const maybeTuple = biSequence(maybeLibURL, maybeZrestURLs);
                const final = function_1.pipe(maybeTuple, E.map(function_2.tupled(zrest_benchmarker_1.benchmark)));
                function_1.pipe(final, E.fold(reason => y({ name: "Failed to parse url", message: reason }, null), resultTask => {
                    resultTask
                        .then(encodeResult)
                        .then(result => y(null, result))
                        .catch((err) => y(err, null));
                }));
            }
            catch (error) {
                y(error, null);
            }
        };
    }
}
function startServer() {
    var server = new grpc.Server();
    server.addService(proto.GreeterService, new GRPCServer());
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    server.start();
}
exports.startServer = startServer;
