import fs from "fs";
import {getLaunchParams, getLaunchParamsByRequest} from "../../utils/authorize.js";
import SystemHelper from "../../helpers/SystemHelper.js";
import {responseObject} from "../../utils/responseUtils.js";

const ROUTES = [
    '/user/withdrawal',
    '/exchange/swap',
    '/exchange/getRate',
    '/boosts/get',
    '/boosts/buy',
    '/boosts/autoclick',
    '/tasks/get',
    '/tasks/check',
    '/statistics/get',
    '/friends/get',
];

const ADMINS_ROUTES = [
    '/admin/get',
    '/admin/saveTask',
    '/admin/deleteTask',
];

export default async function (fastify, opts, done) {
    for (const route of [...ROUTES, ...ADMINS_ROUTES]) {
        const path = `./src/routes/v1${route}`;
        const module = await import(`.${route}/index.js`);

        fastify.post(
            route,
            {
                schema: JSON.parse(
                    fs.readFileSync(`${path}/schema.json`).toString()
                )
            },
            async (request, reply) => {
                const launchParams = getLaunchParamsByRequest(request);

                if (ADMINS_ROUTES.includes(route)) {
                    const systemHelper = new SystemHelper(fastify);
                    const isAdmin = await systemHelper.isAdmin(launchParams.id);

                    if (!isAdmin) {
                        return reply.code(401).send(responseObject('not permissions', false));
                    }
                }

                return module.default(request, reply, fastify, {launchParams});
            }
        );
    }

    let module = await import(`./file/index.js`);
    fastify.get('/file/:filename', {}, module.default);

    module = await import(`./telegramFile/index.js`);
    fastify.get('/telegramFile/:fileId', {}, module.default);

    done();
}