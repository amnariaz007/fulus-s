import {getAdminInline, getChannelsInline, getMenuInline} from "../../buttons.js";
import {checkChannelSubscribe} from "../../../utils/telegram.js";
import SystemHelper from "../../../helpers/SystemHelper.js";
import fastify from "../../../index.js";

const channels = [
    {
        name: "X",
        link: "https://x.com/x",
    },
];

export const sendStartMessage = async (ctx, editOld = false) => {
    ctx.session.writeMode = null;
    ctx.session.payout = null;
    ctx.session.task = null;

    let text = ctx.t("menu");
    const other = {
        parse_mode: "HTML",
        reply_markup: getMenuInline(ctx),
        link_preview_options: {
            is_disabled: true,
        }
    };

    try {
        if (editOld) {
            await ctx.editMessageText(text, other);
            await ctx.answerCallbackQuery();
            return;
        }

        await ctx.reply(text, other);
    } catch (error) {
        //console.error(error)

        try {
            await ctx.deleteMessage();
        } catch (error) {}

        try {
            await ctx.reply(text, other);
        } catch (error) {}
    }
}

export const sendCheckSubscribeMessage = async (ctx) => {
    for (const channel of channels) {
        if (channel.address) {
            const isMember = await checkChannelSubscribe(ctx.from.id, channel.address);
            if (!isMember) {
                return ctx.answerCallbackQuery({
                    text: ctx.t("no-subscribe-error"),
                    show_alert: true,
                });
            }
        }
    }

    return sendStartMessage(ctx, true);
}

export const sendAdminMessage = async (ctx) => {
    const system = new SystemHelper(fastify);
    const isAdmin = await system.isAdmin(ctx.from.id);

    if (!isAdmin) {
        return;
    }

    return ctx.reply("Admin panel", {
        reply_markup: getAdminInline()
    });
}