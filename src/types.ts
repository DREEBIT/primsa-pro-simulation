import ChannelSimulation from "./dynamics/channelSimulation";

export interface IScanSetup {
    startChannel: number;
    stopChannel: number;
    channel: IChannel[];
}

export interface IChannel {
    "@id": number;
    channelMode: string;
    enabled: boolean;
    ppamu: number;
    dwell: number;
    startMass: number;
    stopMass: number;
}

export interface IMeasurementData {
    start: number;
    scansize: number;
    values: any[];
}

export interface IRequestOptions {
    path: string;
    urlParams: any;
    qsParams: any;
    bodyParams: any;
    channelSimulation: ChannelSimulation;
}
