import * as _ from "lodash";
import ChannelSimulation, {IScanData} from "../dynamics/channelSimulation";
import dynamics from "./../dynamics";
import db from "./../persists";

const paths = [
    ...Object.keys(dynamics),
    ...Object.keys(db.get("paths").value()),
];

const channelSimulation = new ChannelSimulation({interval: 200, onValuesUpdate: (scanDatas: IScanData[]) => {
    const firstScan = _.first(scanDatas);
    db.set("measurementData.data", {
        start: 0,
        scansize: _.get(firstScan, "scansize"),
        values: _.chain(scanDatas)
            .map((scanData: IScanData) => scanData.data)
            .flatten()
            .value(),
    }).write();
}});

// channelSimulation.startScan(db.get("scanSetup.data").value())

const mocks = paths.map((path) => {
    return {
        request: {
            method: "GET",
            path,
        },
        response: (urlParams: any, qsParams: any , bodyParams: any) => {

            let body = null;
            if (dynamics[path]) {
                body = dynamics[path]({path, urlParams, qsParams, bodyParams, channelSimulation});
            } else {
                body = db.get("paths").get(path).value();
            }

            return {
                body: JSON.stringify(body),
                statusCode: 200,
            };
        },
    };
});

export default mocks;
