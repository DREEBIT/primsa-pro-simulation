import * as fs from "fs";
import * as path from "path";
import db from "./../persists";

const htmlString = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Prisma Pro API Simulation</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "<h1>Prisma API Simulation</h1>\n" +
    "<ul>\n" +
    "    {{paths}}\n" +
    "</ul>\n" +
    "</body>\n" +
    "</html>\n";

export default function(req, res) {
    const paths = Object.keys(db.get("paths").value()).map((pathItem) => `<li><a href="${pathItem}">${pathItem}</a></li>`);
    const render = htmlString.replace("{{paths}}", paths.join(""));
    res.send(render);
}
