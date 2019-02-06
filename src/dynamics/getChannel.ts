import * as _ from "lodash";
import db from "./../persists";

export default (path: string, urlParams: any, qsParams: any , bodyParams: any) => {

    let channelId = _.get(urlParams, "channelId", _.get(qsParams, "@channelId"), null);
    if (!channelId) {
        return null;
    }
    channelId = parseInt(channelId, undefined);

    let data = db.get("scanSetup.channel").find({
        "@id": channelId,
    }).value();

    console.log(db.get("scanSetup").value());

    if (urlParams.key) {
        data = _.get(data, urlParams.key);
    }

    return {
        data,
        name: "wasSet",
        origin: path,
    };

};
