import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {getUserInfo} from "../../../../utils/telegram.js";

export default async (request, reply, fastify, {launchParams}) => {
    const {isNew} = request.body;

    const user = new UserHelper(launchParams.id, fastify);
    const friendsIds = await user.getFriends();

    const friends = [];
    for (const friend of friendsIds) {
        try {
            const userInfo = await getUserInfo(friend.tgId);
            if (userInfo === null) {
                continue;
            }

            const {name, photo} = userInfo;
            friends.push({name, photo});

            if (friends.length >= 10) {
                break;
            }
        } catch (error) {

        }
    }

    if (isNew) {
        return reply.send(responseObject({
            friends: friends.filter((friend) => friend.name),
            count: friendsIds.length,
        }));
    }

    reply.send(responseObject(friends.filter((friend) => friend.name)));
}