"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const index_1 = require("./../mocks/index");
const getPathMocks = _.mapKeys(index_1.default, (value, key) => {
    const origin = _.get(value, "origin", "/unknown");
    let suffix = "";
    if (!origin.endsWith("/get") && !origin.endsWith("/set")) {
        suffix = "/get";
    }
    return origin + suffix;
});
const map = Object.assign({}, getPathMocks);
const mocks = Object.keys(map).map((path) => {
    return {
        request: {
            method: "GET",
            path,
        },
        response: (urlParams, qsParams, bodyParams) => {
            return {
                body: JSON.stringify(map[path]),
                statusCode: 200,
            };
        },
    };
});
exports.default = mocks;
//# sourceMappingURL=index.js.map