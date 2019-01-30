"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const files = glob.sync(path.resolve(__filename + "/../*.json"))
    .reduce((acc, filepath) => {
    const fileData = fs.readFileSync(filepath, "utf8");
    let json = null;
    try {
        json = JSON.parse(fileData);
    }
    catch (e) {
        console.warn("JSON not valid", filepath);
    }
    if (json) {
        const filename = filepath.split("/").pop().replace(".json", "");
        acc[filename] = json;
    }
    return acc;
}, {});
exports.default = files;
//# sourceMappingURL=index.js.map