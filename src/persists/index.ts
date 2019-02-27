import * as _ from "lodash";
import * as low_ from "lowdb";
import * as Memory_ from "lowdb/adapters/Memory";
import jsonMocks from "../prismaAPIMocks/index";
import * as scanSetup from "./seed/scanSetup.json";

interface IMockMap {
    [s: string]: any;
}

// To compile with rollup
const low: any = (low_ as any).default || low_;
const Memory: any = (Memory_ as any).default || Memory_;

const db = low(new Memory());

const getPathMocks: IMockMap = _.mapKeys(jsonMocks, (value: any, key: string) => {
    const origin = _.get(value, "origin", "/unknown");
    let suffix = "";
    if (!origin.includes("/get") && !origin.includes("/set")) {
        suffix = "/get";
    }
    return origin + suffix;
});

db.defaults({
    paths: getPathMocks,
    scanSetup,
    generalControl: {
      setEM: "Off",
      setEmission: "Off",
    },
    measurementData: {
        name: "got",
        origin: "/mmsp/measurement/data",
        data: {
            start: 0,
            scansize: 0,
            values: [],
        },
    },
})
    .write();


export default db;
