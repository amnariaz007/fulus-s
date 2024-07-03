import SystemHelper from "../../../../helpers/SystemHelper.js";
import {responseObject} from "../../../../utils/responseUtils.js";
import TasksHelper from "../../../../helpers/TasksHelper.js";

export default async (request, reply, fastify, {launchParams}) => {
    const system = new SystemHelper(fastify);
    const tasksHelper = new TasksHelper(fastify);

    const [
        tasks,
    ] = await Promise.all([
        tasksHelper.getTasks(),
    ]);

    reply.send(responseObject({
        tasks: {
            channels: tasks,
        },
    }));
}