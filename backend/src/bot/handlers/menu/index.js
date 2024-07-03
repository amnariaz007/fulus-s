import {Composer} from "grammy";
import {sendAdminMessage, sendCheckSubscribeMessage, sendStartMessage} from "./messages.js";
import {CALLBACK_CHECK_SUBSCRIBE, CALLBACK_MENU} from "../../callbackQueries.js";

const menu = new Composer();

menu.command(
    ["start", "menu"],
    (ctx) => sendStartMessage(ctx, false)
);

menu.callbackQuery(
    [CALLBACK_MENU],
    (ctx) => sendStartMessage(ctx, true)
);

menu.callbackQuery(
    [CALLBACK_CHECK_SUBSCRIBE],
    (ctx) => sendCheckSubscribeMessage(ctx)
);

menu.command(
    ["admin"],
    (ctx) => sendAdminMessage(ctx, false)
);

export default menu;