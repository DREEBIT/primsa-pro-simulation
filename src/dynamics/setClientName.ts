import * as _ from "lodash";
import db from "./../persists";

export default (path: string, urlParams: any, qsParams: any , bodyParams: any) => {

    const getPath = path.replace("set", "get");
    const old = db.get("paths").get(getPath).value();
    old.data = _.first(Object.keys(qsParams));
    db.get("paths").get(getPath).set(old).write();

    return db.get("paths").get(getPath).value();

};
