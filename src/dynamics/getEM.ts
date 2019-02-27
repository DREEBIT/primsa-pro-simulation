import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    return {
        data: db.get("generalControl.setEM", "Off").value(),
        name: "wasSet",
        origin: `/mmsp/generalControl/setEM/get`,
    };



};
