import * as _ from "lodash";
import jsonMocks from "../prismaAPIMocks/index";

interface IMockMap {
    [s: string]: any;
}

const getPathMocks = _.mapKeys(jsonMocks, (value: any, key: string) => {
    const origin = _.get(value, "origin", "/unknown");
    let suffix = "";
    if (!origin.endsWith("/get") && !origin.endsWith("/set")) {
        suffix = "/get";
    }
    return origin + suffix;
});

const map: IMockMap = {
    ...getPathMocks,
};

const mocks = Object.keys(map).map((path) => {
    return {
        request: {
            method: "GET",
            path,
        },
        response: (urlParams: any, qsParams: any , bodyParams: any) => {
            return {
                body: JSON.stringify(map[path]),
                statusCode: 200,
            };
        },
    };
});

export default mocks;
