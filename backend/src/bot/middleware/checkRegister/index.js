import UserHelper from "../../../helpers/UserHelper.js";
import fastify from "../../../index.js";
import {getBotLanguage} from "../../utils/botUtils.js";

async function checkRegister(ctx, next) {
    try {
        if (!ctx.from || !ctx.from.id) {
            await next();
            return;
        }

        let ref = null;
        if (ctx.message && ctx.message.text) {
            ref = ctx.message.text
                .replace('/start ', '')
                .replace('/start', '');
        }

        const user = new UserHelper(ctx.from.id, fastify);
        const isRegister = await user.isRegister();

        if (!isRegister) {
            const lang = getBotLanguage(ctx);

            if (ref && ref.length <= 30) {
                const referralRegex = /^r_\d+$/
                if (referralRegex.test(ref)) {
                    // referral
                    const invitedId = Number(ref.replace('r_', ''));

                    const invitedUser = new UserHelper(invitedId, fastify);
                    if (await invitedUser.isRegister() && invitedId !== ctx.from.id) {
                        await user.register(invitedId, lang);
                        await invitedUser.addGold(2000);
                    }

                    await next();
                    return;
                }
            }

            await user.register(null, lang);
            await next();
            return;
        }

        await next();

        // todo
        //await user.activity();
    } catch (error) {
        console.error(error);
    }
}

export default checkRegister;