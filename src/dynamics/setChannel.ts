import * as _ from "lodash";
import db from "./../persists";

export default (path: string, urlParams: any, qsParams: any , bodyParams: any) => {

    let channelId = _.get(urlParams, "channelId", _.get(qsParams, "@channelId"), null);
    if (!channelId) {
        return null;
    }

    channelId = parseInt(channelId, undefined);
    const query = db.get("scanSetup.channel").find({
        "@id": channelId,
    });
    if (qsParams.dwell) {
        qsParams.dwell = parseFloat(qsParams.dwell);
    }

    const data = query
        .assign(
            qsParams,
        )
        .write();

    return {
        data: {
            "@id": channelId,
            ...Object.keys(qsParams).reduce((acc, key) => {
                acc[key] = data[key];
                return acc;
            }, {}),
        },
        name: "wasSet",
        origin: path,
    };

};
