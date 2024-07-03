import {UPDATE_SCORE} from "../events.js";
import UserHelper from "../../helpers/UserHelper.js";

const connectSocketEvent = async (socket, fastify, {launchParams, userId, version}) => {
    const user = new UserHelper(userId, fastify);
    const score = await user.getScore();

    socket.emit(UPDATE_SCORE, score);
}

export default connectSocketEvent;