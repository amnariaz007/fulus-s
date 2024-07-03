import {AUTOCLICK} from "../events.js";
import UserHelper from "../../helpers/UserHelper.js";
import SystemHelper from "../../helpers/SystemHelper.js";

const autoclickEvent = async (socket, fastify, {launchParams, userId, version}) => {
    socket.on(AUTOCLICK, async () => {
        const system = new SystemHelper(fastify);
        const user = new UserHelper(userId, fastify);
        const score = await user.getScore();

        if (score['autoclickEndTime'] === null) {
            return;
        }

        if (score['energyLeft'] < 1) {
            return;
        }

        await Promise.all([
            user.reduceEnergy(score.energyLeft),
            user.addGold(score.energyLeft),
        ]);
    })
}

export default autoclickEvent;