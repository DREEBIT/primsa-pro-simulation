import * as fs from "fs";
import * as path from "path";
import db from "./../persists";

export default function(req, res) {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
        let htmlString = data.toString();
        const paths = Object.keys(db.get("paths").value()).map((pathItem) => `<li><a href="${pathItem}">${pathItem}</a></li>`);
        htmlString = htmlString.replace("{{paths}}", paths.join(""));
        res.send(htmlString);
    });
}
