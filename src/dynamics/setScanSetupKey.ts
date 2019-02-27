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



    if (Object.keys(urlParams).length) {
        const data = query
            .assign(
                urlParams,
            )
            .write();

        return {
            data: {
                ...Object.keys(urlParams).reduce((acc, key) => {
                    acc[key] = data[key];
                    return acc;
                }, {}),
            },
            name: "wasSet",
            origin: path,
        };
    }



};
