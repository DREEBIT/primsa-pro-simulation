import * as _ from "lodash";
import {IRequestOptions} from "../types";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    const data = _.first(Object.keys(qsParams));

    return {
        data: data,
        name: "wasSet",
        origin: `/mmsp/communication/controlLock/set?${data}`,
    };

};
