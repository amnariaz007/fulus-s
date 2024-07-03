import {socketAuth} from "../utils/authorize.js";
import {computeSocketsByUserId} from "../utils/socketsUtils.js";
import connectSocketEvent from "./events/connectSocketEvent.js";
import disconnectSocketEvent from "./events/disconnectSocketEvent.js";
import clicksEvent from "./events/clicksEvent.js";
import autoclickEvent from "./events/autoclickEvent.js";

const socket = (fastify) => {
    fastify.io.on("connection", async (socket) => {
        try {
            const {launchParams, userId, version} = socket.handshake.auth;

            const result = await socketAuth(launchParams, userId, fastify);
            if (result !== true) {
                //console.log('auth error', result);
                socket.disconnect();
                return;
            }

            const sockets = await fastify.io.fetchSockets();
            const users = computeSocketsByUserId(launchParams['id'], sockets);
            if (users.length > 1) {
                users[0].disconnect();
            }

            //console.log('connect', userId);

            connectSocketEvent(socket, fastify, {launchParams, userId, version}).then();
            disconnectSocketEvent(socket, fastify, {launchParams, userId, version}).then();

            clicksEvent(socket, fastify, {launchParams, userId, version}).then();
            autoclickEvent(socket, fastify, {launchParams, userId, version}).then();
        } catch (error) {
            console.error('disconnect', error);
            socket.disconnect();
        }
    });
}

export default socket;