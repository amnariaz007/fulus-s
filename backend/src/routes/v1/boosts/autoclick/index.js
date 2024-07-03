import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {BOOSTS} from "../config.js";
import {getUnixTime} from "../../../../utils/utils.js";

const costPerHour = 25e3;

export default async (request, reply, fastify, {launchParams}) => {
    const {duration} = request.body;

    if (duration < 1 || duration > 48) {
        return reply.send(responseObject('invalid duration', false));
    }

    const user = new UserHelper(launchParams.id, fastify);
    const score = await user.getScore();

    const cost = costPerHour * duration;

    if (score['gold'] < cost) {
        return reply.send(responseObject('not enough gold', false));
    }

    if (score['autoclickEndTime'] !== null) {
        return reply.send(responseObject('you have this boost', false));
    }

    const autoclickEndTime = getUnixTime() + duration * 3600;

    await Promise.all([
        user.set('autoclickEndTime', autoclickEndTime),
        user.reduceGold(cost),
    ]);

    reply.send(responseObject({autoclickEndTime}));
}
