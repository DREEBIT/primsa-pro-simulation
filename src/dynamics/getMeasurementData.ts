import {IRequestOptions} from "../types";
import db from "./../persists";


export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    return db.get("measurementData").value();

};
