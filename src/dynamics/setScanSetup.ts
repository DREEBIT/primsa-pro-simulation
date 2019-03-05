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


    const query = db.get("scanSetup.data");

    const qsParamsKeys = Object.keys(qsParams);
    const params = qsParamsKeys.reduce((acc: any, key) => {
        if (keys.indexOf(key) > -1) {
            acc[key] = qsParams[key];
        }
        if (key !== "scanStop") {
            acc[key] = parseInt(acc[key], undefined);
        }

        if (key === "startchannel") {
            acc.startChannel = Number(qsParams[key]);
        }

        if (key === "stopchannel") {
            acc.stopChannel = Number(qsParams[key]);
        }

        if (key === "scanstart") {
            channelSimulation.startScan(query.value());
        }

        if (key === "scanstop") {
            channelSimulation.stopScan();
        }
        return acc;
    }, {});

    if (qsParamsKeys.indexOf("@channel") > -1){

        const data = query
            .get("channel")
            .find({
                "@id": Number(qsParams["@channel"]),
            })
            .assign(
                qsParams,
            )
            .write();

        return {
            data,
            name: "wasSet",
            origin: path,
        };

    }else {

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
    }





};
