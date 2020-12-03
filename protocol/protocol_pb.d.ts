// package: protocol
// file: protocol.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Void extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Void.AsObject;
    static toObject(includeInstance: boolean, msg: Void): Void.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Void, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Void;
    static deserializeBinaryFromReader(message: Void, reader: jspb.BinaryReader): Void;
}

export namespace Void {
    export type AsObject = {
    }
}

export class Measurement extends jspb.Message { 
    getUnit(): string;
    setUnit(value: string): Measurement;

    getValue(): number;
    setValue(value: number): Measurement;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Measurement.AsObject;
    static toObject(includeInstance: boolean, msg: Measurement): Measurement.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Measurement, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Measurement;
    static deserializeBinaryFromReader(message: Measurement, reader: jspb.BinaryReader): Measurement;
}

export namespace Measurement {
    export type AsObject = {
        unit: string,
        value: number,
    }
}

export class MeasurementTable extends jspb.Message { 

    getMeasurementtableMap(): jspb.Map<string, Measurement>;
    clearMeasurementtableMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MeasurementTable.AsObject;
    static toObject(includeInstance: boolean, msg: MeasurementTable): MeasurementTable.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MeasurementTable, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MeasurementTable;
    static deserializeBinaryFromReader(message: MeasurementTable, reader: jspb.BinaryReader): MeasurementTable;
}

export namespace MeasurementTable {
    export type AsObject = {

        measurementtableMap: Array<[string, Measurement.AsObject]>,
    }
}

export class BenchmarkInfo extends jspb.Message { 
    getLiburl(): string;
    setLiburl(value: string): BenchmarkInfo;

    clearModelurlsList(): void;
    getModelurlsList(): Array<string>;
    setModelurlsList(value: Array<string>): BenchmarkInfo;
    addModelurls(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BenchmarkInfo.AsObject;
    static toObject(includeInstance: boolean, msg: BenchmarkInfo): BenchmarkInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BenchmarkInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BenchmarkInfo;
    static deserializeBinaryFromReader(message: BenchmarkInfo, reader: jspb.BinaryReader): BenchmarkInfo;
}

export namespace BenchmarkInfo {
    export type AsObject = {
        liburl: string,
        modelurlsList: Array<string>,
    }
}
