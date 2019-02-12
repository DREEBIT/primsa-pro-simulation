import * as _ from "lodash";
import {IChannel, IScanSetup} from "../../types";
import sweep from "./sweep";
import timeStamp from "./timeStamp";
import totalPressure from "./totalPressure";


const factories: {
    [s: string]: (channel: IChannel) => any[];
} = {
    Timestamp: timeStamp,
    TotalPressure: totalPressure,
    Sweep: sweep,
};

export interface IScanData {
    scansize: number;
    data: any[];
}

type UpdateValuesCallback = (IScanData) => void;

class ChannelSimulation {

    private scans: IScanData[] = [];
    private currentScan?: IScanData;
    private interval: number = 300;
    private intervalId?: any;
    private onValuesUpdate?: UpdateValuesCallback;
    private sweepLimit = 50;
    private maxScanSize = 1000;

    constructor(options: {
        interval: number,
        onValuesUpdate: UpdateValuesCallback,
    }) {
        this.onValuesUpdate = options.onValuesUpdate;
        this.interval = options.interval || this.interval;
    }

    public startScan(scanSetup: IScanSetup) {

        this.scans = [];
        this.stopScan();

        this.intervalId = setInterval(() => {
            this.onInterval(scanSetup);
        }, this.interval);

    }

    public stopScan() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private onInterval(scanSetup: IScanSetup) {


        const newScanValues = this.generateScanData(scanSetup);


        const currentData = [..._.get(this.currentScan, "data", [])];
        const start = currentData.length;
        const upperLimit = currentData.length + this.sweepLimit;
        const end = currentData.length ? _.min([upperLimit, newScanValues.length]) : upperLimit;
        const newValues = newScanValues.slice(start, end);
        this.currentScan = {
            scansize: newScanValues.length,
            data: [
                ...currentData,
                ...newValues,
            ],
        };

        if (this.onValuesUpdate) {
            this.onValuesUpdate([
                ...this.scans,
                this.currentScan,
            ]);
        }

        if (this.currentScan.scansize === this.currentScan.data.length) {
            this.scans.push({...this.currentScan});
            this.currentScan.data = [];
        }

        if (this.scans.length > this.maxScanSize){
            this.scans = [];
        }

    }

    private generateScanData(scanSetup: IScanSetup ): any[] {

        const startChannel = _.get(scanSetup, "startChannel");
        const stopChannel = _.get(scanSetup, "stopChannel");

        const result = _.chain(scanSetup)
            .get("channel", [])
            .filter((item, index) => {
                const channelId = _.get(item, "@id", 0);
                return  channelId >= startChannel && channelId <= stopChannel;
            })
            .map((channel: IChannel) => {
                const factory = _.get(factories, channel.channelMode);
                return factory ? factory(channel) : [];
            })
            .flatten()
            .value();

        return result;
    }

}



export default ChannelSimulation;
