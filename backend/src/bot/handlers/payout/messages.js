import UserHelper from "../../../helpers/UserHelper.js";
import fastify from "../../../index.js";
import PayoutsHelper from "../../../helpers/PayoutsHelper.js";
import {isPayoutAdmin} from "../../utils/accessUtils.js";
import {PAYOUT_GAS_USDT} from "./config.js";

export const sendAdminPayoutConfirmOkMessage = async (ctx, editOld = false) => {
    if (!isPayoutAdmin(ctx.from.id)) {
        return;
    }

    const id = Number(ctx.callbackQuery.data
        .replace('CALLBACK_ADMIN_PAYOUT_CONFIRM_OK_', ''));

    if (id < 1) {
        return;
    }

    const payoutsHelper = new PayoutsHelper(fastify);
    const payout = await payoutsHelper.getPayout(id);

    if (!payout) {
        return;
    }

    if (payout.status !== 0) {
        return;
    }

    await ctx.editMessageReplyMarkup();
    await payoutsHelper.updateStatus(id, 1);
}

export const sendAdminPayoutConfirmNoMessage = async (ctx, editOld = false) => {
    if (!isPayoutAdmin(ctx.from.id)) {
        return;
    }

    const id = Number(ctx.callbackQuery.data
        .replace('CALLBACK_ADMIN_PAYOUT_CONFIRM_NO_', ''));

    if (id < 1) {
        return;
    }

    const payoutsHelper = new PayoutsHelper(fastify);
    const payout = await payoutsHelper.getPayout(id);

    if (!payout) {
        return;
    }

    if (payout.status !== 0) {
        return;
    }

    await ctx.editMessageReplyMarkup();
    await payoutsHelper.updateStatus(id, -1);

    const user = new UserHelper(payout.userId, fastify);

    await user.addUSDT(payout.count);
}