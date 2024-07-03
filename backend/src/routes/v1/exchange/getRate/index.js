import {responseObject} from "../../../../utils/responseUtils.js";
import {EXCHANGE_RATE_GOLD_PER_USDT} from "../config.js";

export default async (request, reply, fastify, {launchParams}) => {
    reply.send(responseObject({
        //goldPerROCKET: EXCHANGE_RATE_GOLD_PER_ROCKET,
        goldPerUSDT: EXCHANGE_RATE_GOLD_PER_USDT
    }));
}