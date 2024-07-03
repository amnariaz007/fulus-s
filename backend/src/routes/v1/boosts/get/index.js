import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {BOOSTS} from "../config.js";

export default async (request, reply, fastify, {launchParams}) => {
    const boosts = Object.keys(BOOSTS);

    const user = new UserHelper(launchParams.id, fastify);
    const boostsLevels = await user.getBoosts();

    const result = boosts.map((boostName) => {
        const boost = BOOSTS[boostName];
        const level = boostsLevels[boostName] ?? 0;

        const newLevel = level + 1;
        let updateCost = -1;

        if (boost.levels) {
            if (boost.levels[newLevel]) {
                updateCost = boost.levels[newLevel].cost;
            }
        }

        return {
            level,
            id: boost.id,
            name: boost.name,
            emoji: boost.emoji,
            updateCost: updateCost,
            updateCostCurrency: boost.currency,
        };
    });

    reply.send(responseObject(result));
}