import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";

const files = glob.sync(path.resolve(__filename + "/../*.json"))
    .reduce((acc: any, filepath: string) => {
        const fileData = fs.readFileSync(filepath, "utf8");

        let json = null;
        try {
            json = JSON.parse(fileData);
        } catch (e) {
            console.warn("JSON not valid", filepath);
        }
        if (json) {
            let filename = filepath.split("/").pop();
            if (filename) {
                filename = filename.replace(".json", "");
            } else {
                filename = "default";
            }
            acc[filename] = json;
        }

        return acc;
    }, {});

export default files;
