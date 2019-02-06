import * as _ from "lodash";
import db from "./../persists";

export default (path: string, urlParams: any, qsParams: any , bodyParams: any) => {

    let data = db.get("scanSetup").value();

    const key = _.get(urlParams, "key");
    if (key) {
       data = data[key];
    }

    return {
        data,
        name: "wasSet",
        origin: path,
    };

};
