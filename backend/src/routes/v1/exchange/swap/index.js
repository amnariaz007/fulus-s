import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {EXCHANGE_RATE_GOLD_PER_USDT} from "../config.js";

export default async (request, reply, fastify, {launchParams}) => {
    const usdtCount = Math.floor(request.body['usdtCount']);

    if (usdtCount < 1 || usdtCount > 99999) {
        return reply.code(400).send(responseObject('invalid usdt count', false));
    }

    const user = new UserHelper(launchParams.id, fastify);
    const gold = await user.getGold();

    const needGold = EXCHANGE_RATE_GOLD_PER_USDT * usdtCount;
    if (needGold > gold) {
        return reply.code(400).send(responseObject('not enough gold', false));
    }

    await Promise.all([
        user.reduceGold(needGold),
        user.addUSDT(usdtCount),
    ]);

    reply.send(responseObject('ok'));
}