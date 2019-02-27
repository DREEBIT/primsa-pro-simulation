import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    const data = _.first(Object.keys(qsParams));

    const emission = db.get("generalControl.setEmission").value();

    if (emission !== "On") {
        return {
            data: "Off",
            name: "wasSet",
            conditions: [
                {
                    command: "setEM",
                    code: 17,
                    id: "interlockEmisRequired",
                    level: "warning.software",
                    message: "Emission must be on first",
                },
            ],
            origin: `/mmsp/generalControl/setEM/set?${data}`,
        };
    } else {
        db.get("generalControl").set("setEM", data).write();

        return {
            data,
            name: "wasSet",
            origin: `/mmsp/generalControl/setEM/set?${data}`,
        };
    }



};
