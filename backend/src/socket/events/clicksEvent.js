import {CLICKS, UPDATE_LEVEL, UPDATE_SCORE} from "../events.js";
import UserHelper from "../../helpers/UserHelper.js";
import {getLevelById, getNewLevelByGold} from "../../utils/levelUtils.js";
import SystemHelper from "../../helpers/SystemHelper.js";
import {getUnixTime} from "../../utils/utils.js";

const rate = {};
let i = 0;

const clicksEvent = async (socket, fastify, {launchParams, userId, version}) => {
    socket.on(CLICKS, async ({count}) => {
        count = Number(count).toFixed(0);
        if (count < 1 || count > 20) {
            //console.log('invalid count', count, userId);
            return;
        }

        if (!rate[userId]) {
            rate[userId] = {
                clicks: 0,
                lastResetTime: getUnixTime(),
            };
        }
        if (rate[userId].clicks > 105) {
            if (getUnixTime() - rate[userId].lastResetTime < 10) {
                //console.log('hack', userId, i);
                //i++;
                //const score = await user.getScore();
                //socket.emit(UPDATE_SCORE, score);

                return;
            }

            rate[userId] = {
                clicks: 0,
                lastResetTime: getUnixTime(),
            };
        }

        // todo: сохраняем и проверяем время прошлых кликов, рейт лимит

        const system = new SystemHelper(fastify);
        const user = new UserHelper(userId, fastify);
        const score = await user.getScore();

        const goldCount = count * score.goldPerClick;
        const needEnergy = goldCount;

        if (score.energyLeft < needEnergy) {
            return;
        }

        // rate
        rate[userId].clicks += Number(count);

        // rate

        await Promise.all([
            user.reduceEnergy(needEnergy),
            user.addGold(goldCount),
            system.addTotalClicksCount(count),
        ]);

        const data = await user.get();
        const newLevel = getNewLevelByGold(score.gold + count * score.goldPerClick);
        if (newLevel > data['level']) {
            await user.setLevel(newLevel);
            socket.emit(UPDATE_LEVEL, getLevelById(newLevel));
        }
    })
}

export default clicksEvent;