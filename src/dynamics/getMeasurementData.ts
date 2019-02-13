import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";


export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    const start = parseInt(_.get(qsParams, "@start"), undefined) || 0;
    const end = parseInt(_.get(qsParams, "@end"), undefined) || -1;

    const measurement = db.get("measurementData").value();
    let values = _.chain(measurement).get("data.values",[]).value();

    if (start) {
        values = _.drop(values, start);
    }
    if (end) {
        values = _.take(values, end - start);
    }
    _.set(measurement, "data.values", values);

    return measurement;

};
