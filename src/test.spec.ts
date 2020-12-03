import * as grpc from "grpc";
import { spawn, ChildProcess } from "child_process";
import { GreeterClient } from "../protocol/protocol_grpc_pb";
import { BenchmarkInfo } from "../protocol/protocol_pb";
import { cons } from "fp-ts/lib/ReadonlyArray";
import {resolve} from "path";
var server:ChildProcess;
var client = new GreeterClient("localhost:50051", grpc.credentials.createInsecure());

const binPath = resolve(__dirname, "zrest-benchmarking-server.ts");
beforeAll((done)=>{
    server = spawn("npx", ["ts-node", binPath], {
        detached: true
    });
    server.stdout?.on("data", (chunk)=>{
        console.log("Server says:", chunk.toString("utf8"))
    })
    client.waitForReady(Date.now() + 1000 * 10, (err)=>{
        console.log(err);
        done();
    });
}, 1000 * 60 * 3)

afterAll(()=>{
    server.kill();
})

const sampleLib = "https://viewer-library.s3.ap-northeast-2.amazonaws.com/closet.viewer.js";

const sampleZrests = [
    "https://zrest-free-sample.s3.ap-northeast-2.amazonaws.com/7438d-o.dudu8u.zrest",
    "https://zrest-free-sample.s3.ap-northeast-2.amazonaws.com/aoceuhoceuhco.zrest",
    "https://zrest-free-sample.s3.ap-northeast-2.amazonaws.com/oos-chichuci-cuu.zrest",
]
test("test", (done) => {
    const x = new BenchmarkInfo();
    x.setLiburl(sampleLib);
    x.setModelurlsList(sampleZrests);
    client.benchmark(x, (err,rsp)=>{
        console.log(err,rsp);
        if (err) {
            console.error(err);
            expect(false).toBeTruthy();
        } else {
            rsp.getResultMap().forEach((x,y)=>{
                console.log(y);
                x.getMeasurementtableMap().forEach((a,b)=>{
                    console.log({[b]:{unit:a.getUnit(), value:a.getValue()}})
                })
            })
            
            console.log(rsp.getResultMap())
            expect(true).toBeTruthy();
        }
        done();
    })
}, 1000 * 60)