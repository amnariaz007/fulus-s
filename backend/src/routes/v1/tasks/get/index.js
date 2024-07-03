import {responseObject} from "../../../../utils/responseUtils.js";
import TasksHelper from "../../../../helpers/TasksHelper.js";
import UserHelper from "../../../../helpers/UserHelper.js";

export default async (request, reply, fastify, {launchParams}) => {
    const tasksHelper = new TasksHelper(fastify);
    const allTasks = await tasksHelper.getTasks();

    // todo: пока что работает только с каналами
    const user = new UserHelper(launchParams.id, fastify);
    const completedChannelsTasks = await user.getCompletedTasksByCategory('channels');

    const tasks = allTasks.map((task) => {
        if (completedChannelsTasks.includes(task.id)) {
            task.award = -1;
        }

        return task;
    });

    reply.send(responseObject({
        channels: tasks
    }));
}