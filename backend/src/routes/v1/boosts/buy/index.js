import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {BOOSTS} from "../config.js";

export default async (request, reply, fastify, {launchParams}) => {
    const boostName = request.body.boost;

    if (!BOOSTS[boostName] || boostName === 'tapbot') {
        return reply.code(400).send(responseObject('invalid boost', false));
    }

    const user = new UserHelper(launchParams.id, fastify);
    const boostLevel = await user.getBoostLevel(boostName);

    const boostInfo = BOOSTS[boostName];
    const newLevel = boostLevel + 1;

    if (!boostInfo.levels[newLevel]) {
        return reply.code(400).send(responseObject('max level', false));
    }

    let cost = boostInfo.levels[newLevel].cost;

    const gold = await user.getGold();
    if (gold < cost) {
        return reply.code(400).send(responseObject('not enough gold', false));
    }

    await Promise.all([
        user.reduceGold(cost),
        user.setBoostLevel(boostName, newLevel),
    ]);

    const userData = await user.get();

    const newValue = userData[boostInfo.effect.field] + boostInfo.effect.addCount;
    await user.set(boostInfo.effect.field, newValue);

    switch (boostName) {
        case 'multiclick': {
            return reply.send(responseObject({ newGoldPerClick: newValue }));
        }

        case 'energy': {
            return reply.send(responseObject({ dailyEnergy: newValue }));
        }

        case 'recharging': {
            return reply.send(responseObject({ rechargingEnergy: newValue }));
        }
    }
}