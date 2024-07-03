import { DefaultEventsMap } from "@socket.io/component-emitter";
import {io, Socket} from "socket.io-client";

let connection: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

// @ts-ignore
const initData = window["Telegram"]['WebApp']['initData'];
// @ts-ignore
const initDataUnsafe = window["Telegram"]['WebApp']['initDataUnsafe'];

export const socket = io(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : (process.env.REACT_APP_API_URL as string),
    {
        autoConnect: false,
        reconnectionDelayMax: 10000,
        auth: {
            launchParams: initData,
            userId: initDataUnsafe['user']['id'],
            version: `v1`,
        },
        transports: ["websocket"], // webtransport
    }
);