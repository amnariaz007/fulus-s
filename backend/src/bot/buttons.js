import {InlineKeyboard} from "grammy";
import {getAppUrl} from "../utils/utils.js";
import {CALLBACK_CHECK_SUBSCRIBE, CALLBACK_MENU} from "./callbackQueries.js";

export const getDefaultInline = (ctx) => {
    return InlineKeyboard.from([
        [InlineKeyboard.text(ctx.t("button-menu"), CALLBACK_MENU)],
    ]);
}

export const getMenuInline = (ctx) => {
    return InlineKeyboard.from([
        [InlineKeyboard.webApp(ctx.t("button-open-app"), getAppUrl())],
    ]);
}

export const getChannelsInline = (ctx, channels) => {
    const lines = [];

    channels.forEach((channel) => {
        lines.push([InlineKeyboard.url(channel.name, channel.link)]);
    });

    lines.push([InlineKeyboard.text(ctx.t("button-check-subscribe"), CALLBACK_CHECK_SUBSCRIBE)]);

    return InlineKeyboard.from(lines);
}

export const getConfirmPayoutAdminInline = (id) => {
    return InlineKeyboard.from([
        [InlineKeyboard.text("✅ Confirm", `CALLBACK_ADMIN_PAYOUT_CONFIRM_OK_${id}`)],
        [InlineKeyboard.text("🚫 Cancel", `CALLBACK_ADMIN_PAYOUT_CONFIRM_NO_${id}`)],
    ]);
}

export const getAdminInline = () => {
    const buttons = [
        [InlineKeyboard.webApp("Open", `${getAppUrl()}/admin`)],
    ];

    return InlineKeyboard.from(buttons);
}