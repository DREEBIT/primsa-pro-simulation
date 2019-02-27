import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    const data = _.first(Object.keys(qsParams));

    db.get("generalControl").set("setEmission", data).write();

    return {
        data,
        name: "wasSet",
        origin: `/mmsp/generalControl/setEmission/set?${data}`,
    };

};
