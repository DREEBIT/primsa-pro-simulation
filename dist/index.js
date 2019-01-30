"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_mock_server_1 = require("express-mock-server");
const _ = require("lodash");
const sources_1 = require("./sources");
const init = (configArg) => {
    const config = _.defaults(configArg, {
        controlApiUrl: "/mmsp",
        port: 8000,
    });
    return express_mock_server_1.serverStart([sources_1.default], config);
};
exports.default = init;
//# sourceMappingURL=index.js.map