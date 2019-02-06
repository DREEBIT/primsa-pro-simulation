import _ from "lodash";
import dynamics from "./../dynamics";
import db from "./../persists";

const paths = [
    ...Object.keys(dynamics),
    ...Object.keys(db.get("paths").value()),
];

const mocks = paths.map((path) => {
    return {
        request: {
            method: "GET",
            path,
        },
        response: (urlParams: any, qsParams: any , bodyParams: any) => {

            let body = null;
            if (dynamics[path]) {
                body = dynamics[path](path, urlParams, qsParams, bodyParams);
            } else {
                body = db.get("paths").get(path).value();
            }

            return {
                body: JSON.stringify(body),
                statusCode: 200,
            };
        },
    };
});

export default mocks;
