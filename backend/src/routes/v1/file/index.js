import {responseObject} from "../../../utils/responseUtils.js";
import fs from "fs";

export default async (request, reply) => {
    const { filename } = request.params;

    if (filename.includes('/')) {
        return reply.send(responseObject("invalid filename", false));
    }

    const path = `./src/files/${filename}`;
    if (!fs.existsSync(path)) {
        return reply.code(404).send(responseObject('not found', false));
    }

    try {
        const file = fs.readFileSync(path);

        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Content-Type", "image/jpeg; image/png;");

        return reply.send(file);
    } catch (error) {
        //console.error(error)
        return reply.send(responseObject('file error', false));
    }
}