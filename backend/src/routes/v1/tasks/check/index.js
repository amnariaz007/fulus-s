import {responseObject} from "../../../../utils/responseUtils.js";
import TasksHelper from "../../../../helpers/TasksHelper.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import {checkChannelSubscribe} from "../../../../utils/telegram.js";

export default async (request, reply, fastify, {launchParams}) => {
    const id = request.body.id;

    const tasksHelper = new TasksHelper(fastify);
    const task = await tasksHelper.getTaskById(id);

    if (task === null) {
        reply.code(400).send(responseObject('task not found', false));
        return;
    }

    // todo: пока что работает только с каналами
    const user = new UserHelper(launchParams.id, fastify);
    const completedChannelsTasks = await user.getCompletedTasksByCategory('channels');

    if (completedChannelsTasks.includes(id)) {
        reply.code(400).send(responseObject('this task completed', false));
        return;
    }

    if (task['channelAddress']) {
        const isChannelMember = await checkChannelSubscribe(launchParams.id, task['channelAddress']);
        if (!isChannelMember) {
            reply.send(responseObject('not subscribed'));
            return;
        }
    }

    await Promise.all([
        user.taskCompleted('channels', id),
        user.addGold(task['award']),
    ]);

    reply.send(responseObject('ok'));
}