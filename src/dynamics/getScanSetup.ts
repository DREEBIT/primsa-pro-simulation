import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

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
