import * as _ from "lodash";
import {IRequestOptions} from "../types";
import db from "./../persists";

export default ({urlParams, bodyParams, qsParams, path}: IRequestOptions) => {

    let channelId = _.get(urlParams, "channelId", _.get(qsParams, "@channelId"), null);
    if (!channelId) {
        return null;
    }
    channelId = parseInt(channelId, undefined);

    let data = db.get("scanSetup.data.channel").find({
        "@id": channelId,
    }).value();


    if (urlParams.key) {
        data = _.get(data, urlParams.key);
    }

    return {
        data,
        name: "wasSet",
        origin: path,
    };

};
