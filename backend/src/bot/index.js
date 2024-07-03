import {Bot, InlineKeyboard, session} from "grammy";
import {autoRetry} from "@grammyjs/auto-retry";
import {run, sequentialize} from "@grammyjs/runner";
import menu from "./handlers/menu/index.js";
import checkRegister from "./middleware/checkRegister/index.js";
import errorHandler from "./error/errorHandler/index.js";
import {conversations, createConversation} from "@grammyjs/conversations";
import {I18n} from "@grammyjs/i18n";
import payout from "./handlers/payout/index.js";

function getSessionKey(ctx) {
    return ctx.chat?.id.toString();
}

const i18n = new I18n({
    defaultLocale: "en",
    directory: "./src/bot/locales",
});

export const bot = new Bot(process.env.BOT_ACCESS_TOKEN);

export const startBot = (fastify) => {
    bot.catch(errorHandler);

    bot.use(sequentialize(getSessionKey));
    bot.use(session({
        initial: () => ({
            writeMode: null,
            payout: null,
            task: null,
        }),
        getSessionKey
    }));

    bot.use(conversations());
    bot.use(i18n);

    bot.api.config.use(autoRetry());

    bot.use(checkRegister);

    bot.use(menu);
    bot.use(payout);

    const runner = run(bot);
    runner.task().then(() => {
        console.log("Bot done processing!");
    });

    const stopRunner = () => runner.isRunning() && runner.stop();
    process.once("SIGINT", () => stopRunner);
    process.once("SIGTERM", () => stopRunner);
}
