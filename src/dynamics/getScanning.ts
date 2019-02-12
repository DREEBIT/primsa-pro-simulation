import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path, channelSimulation}: IRequestOptions) => {


    return {
        data: channelSimulation.isScanning(),
        name: "got",
        origin: "/mmsp/scanInfo/scanning"
    }

};
