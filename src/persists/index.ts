import * as _ from "lodash";
import * as low_ from "lowdb";
import * as Memory from "lowdb/adapters/Memory";
import jsonMocks from "../prismaAPIMocks/index";
import * as scanSetup from "./seed/scanSetup.json";

interface IMockMap {
    [s: string]: any;
}

//To compile with rollup
const low: any = (low_ as any).default || low_;

const db = low(new Memory());

const getPathMocks: IMockMap = _.mapKeys(jsonMocks, (value: any, key: string) => {
    const origin = _.get(value, "origin", "/unknown");
    let suffix = "";
    if (!origin.endsWith("/get") && !origin.endsWith("/set")) {
        suffix = "/get";
    }
    return origin + suffix;
});

db.defaults({
    paths: getPathMocks,
    scanSetup,
})
    .write();


export default db;
