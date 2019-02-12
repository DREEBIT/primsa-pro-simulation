import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

const keys = ["maxChannels",
    "startChannel",
    "stopChannel",
    "scanCount",
    "scanStop",
    "scanInterval",
    "dwellGlobal",
    "leadInDwell",
    "scanTimeTotal",
    "scanTimeBaseline",
    "scanTimeReportable",
    "scanTimePeakfindShortest",
    "scanTimePeakfindLongest",
    "scanTimePeakfindAverage",
    "scanTimeTotalFirstOne",
    "baselineAverageNumber",
    "baselineExtraCount",
    "baselineLeadInCount",
    "baselineLeadInDwell",
    "leakCheckMass",
    ];

export default ({urlParams, bodyParams, qsParams, path, channelSimulation}: IRequestOptions) => {


    const query = db.get("scanSetup");

    const params = Object.keys(qsParams).reduce((acc, key) => {
        if (keys.indexOf(key) > -1) {
            acc[key] = qsParams[key];
        }
        if (key !== "scanStop") {
            acc[key] = parseInt(acc[key], undefined);
        }

        if (key === "scanstart") {
            channelSimulation.startScan(query.get("data").value());
        }

        if (key === "scanstop") {
            channelSimulation.stopScan();
        }

        return acc;
    }, {});

    if (Object.keys(params).length) {
        const data = query
            .assign(
                params,
            )
            .write();

        return {
            data: {
                ...Object.keys(params).reduce((acc, key) => {
                    acc[key] = data[key];
                    return acc;
                }, {}),
            },
            name: "wasSet",
            origin: path,
        };
    }



};
