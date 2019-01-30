import { readFileSync } from 'fs';
import { sync } from 'glob';
import { resolve } from 'path';
import { defaults, mapKeys, get } from 'lodash';
import { serverStart } from 'express-mock-server';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var files = sync(resolve(__filename + "/../*.json"))
    .reduce(function (acc, filepath) {
    var fileData = readFileSync(filepath, "utf8");
    var json = null;
    try {
        json = JSON.parse(fileData);
    }
    catch (e) {
        console.warn("JSON not valid", filepath);
    }
    if (json) {
        var filename = filepath.split("/").pop();
        if (filename) {
            filename = filename.replace(".json", "");
        }
        else {
            filename = "default";
        }
        acc[filename] = json;
    }
    return acc;
}, {});

var getPathMocks = mapKeys(files, function (value, key) {
    var origin = get(value, "origin", "/unknown");
    var suffix = "";
    if (!origin.endsWith("/get") && !origin.endsWith("/set")) {
        suffix = "/get";
    }
    return origin + suffix;
});
var map = __assign({}, getPathMocks);
var mocks = Object.keys(map).map(function (path) {
    return {
        request: {
            method: "GET",
            path: path,
        },
        response: function (urlParams, qsParams, bodyParams) {
            return {
                body: JSON.stringify(map[path]),
                statusCode: 200,
            };
        },
    };
});

var init = function (configArg) {
    var config = defaults(configArg, {
        controlApiUrl: "/mmsp",
        port: 8000,
    });
    return serverStart([mocks], config);
};

export default init;
//# sourceMappingURL=prisma-pro-simulation.es5.js.map
