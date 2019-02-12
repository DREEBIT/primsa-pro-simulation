import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    const getPath = path.replace("set", "get");
    const old = db.get("paths").get(getPath).value();
    old.data = _.first(Object.keys(qsParams));
    db.get("paths").get(getPath).set(old).write();

    return db.get("paths").get(getPath).value();

};
