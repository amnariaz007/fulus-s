import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import SystemHelper from "../../../../helpers/SystemHelper.js";
import {formatNumberWithSpaces} from "../../../../utils/utils.js";

export default async (request, reply, fastify, {launchParams}) => {
    const sockets = await fastify.io.fetchSockets();

    const system = new SystemHelper(fastify);

    const [
        totalClicks,
        totalUsers,
        todayUsers,
    ] = await Promise.all([
        system.getTotalClicksCount(),
        system.getTotalUsersCount(),
        system.getTodayUsersCount(),
    ]);

    reply.send(responseObject([
        {
            id: 'allClicksCount',
            emoji: 'finger_1',
            localeId: 'statisticsAllClicksCountField',
            value: formatNumberWithSpaces(totalClicks),
        },
        {
            id: 'allUsersCount',
            emoji: 'users',
            localeId: 'statisticsAllUsersCountField',
            value: formatNumberWithSpaces(totalUsers),
        },
        {
            id: 'todayUsersCount',
            emoji: 'calendar',
            localeId: 'statisticsTodayUsersCountField',
            value: formatNumberWithSpaces(todayUsers),
        },
        {
            id: 'usersOnlineCount',
            emoji: 'joystick',
            localeId: 'statisticsUsersOnlineCountField',
            value: formatNumberWithSpaces(sockets.length),
        },
    ]))
}