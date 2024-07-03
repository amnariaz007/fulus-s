import {responseObject} from "../../../../utils/responseUtils.js";
import UserHelper from "../../../../helpers/UserHelper.js";
import PayoutsHelper from "../../../../helpers/PayoutsHelper.js";
import {bot} from "../../../../bot/index.js";
import {getConfirmPayoutAdminInline} from "../../../../bot/buttons.js";

export default async (request, reply, fastify, {launchParams}) => {
    const {token, amount, cryptoNetwork, cryptoAddress} = request.body;

    if (!['usdt'].includes(token)) {
        return reply.send(responseObject('invalid token', false));
    }

    if (amount < 1 || amount > 1e6) {
        return reply.send(responseObject('invalid amount', false));
    }

    if (!['trc20', 'bep20'].includes(cryptoNetwork)) {
        return reply.send(responseObject('invalid network', false));
    }

    const regExp = /^[0-9a-fA-FTx]+$/;
    if (!regExp.test(cryptoAddress)) {
        return reply.send(responseObject('invalid address', false));
    }

    if (cryptoAddress.length > 100) {
        return reply.send(responseObject('invalid address', false));
    }

    const payoutsHelper = new PayoutsHelper(fastify);
    const payoutId = await payoutsHelper.create(
        launchParams.id,
        token,
        cryptoNetwork,
        amount,
        cryptoAddress
    );

    const user = new UserHelper(launchParams.id, fastify);

    switch (token) {
        case 'usdt': {
            await user.reduceUSDT(amount);

            break;
        }
    }

    await bot.api.sendMessage(
        process.env.PAYOUTS_CHAT_ID,
        `<b>New withdrawal! ID: ${payoutId}</b>\n\nUser <a href="tg://user?id=${launchParams.id}">${launchParams.id}</a>\n\nToken: ${token}\nCount: <code>${amount}</code>\n\nAddress: <code>${cryptoAddress}</code>\n\nNetwork: <code>${cryptoNetwork}</code>`,
        {
            parse_mode: "HTML",
            reply_markup: getConfirmPayoutAdminInline(payoutId),
        }
    );

    reply.send(responseObject('ok'));
}