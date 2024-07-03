import routeV1 from "./routes/v1/index.js";
import {authorize} from "./utils/authorize.js";
import fastifyIO from 'fastify-socket.io';
import socket from "./socket/socket.js";

const serverStart = async (fastify) => {

    fastify.register(routeV1, {prefix: '/v1'});

    fastify.register(fastifyIO, { cors: {origin: "*"} });

    fastify.addSchema({
        $id: 'headersSchema',
        type: 'object',
        required: ['launch-params'],
        properties: {
            "launch-params": { type: 'string' }
        }
    })

    fastify.addHook('preHandler', (request, reply, done) => {
        authorize(request, reply, done, fastify)
    });

    await fastify.listen({
        port: process.env.SERVER_PORT,
        host: "localhost",
    }, (error, address) => {
        if (error) {
            console.log(error);
            process.exit(1);
            return;
        }

        socket(fastify);
        console.log(`server listening on ${address}`);
    })

}

export default serverStart;