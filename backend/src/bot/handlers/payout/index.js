import {Composer} from "grammy";
import {sendAdminPayoutConfirmNoMessage, sendAdminPayoutConfirmOkMessage} from "./messages.js";

const payout = new Composer();

payout.callbackQuery(
    /CALLBACK_ADMIN_PAYOUT_CONFIRM_OK_\d+/,
    sendAdminPayoutConfirmOkMessage
)

payout.callbackQuery(
    /CALLBACK_ADMIN_PAYOUT_CONFIRM_NO_\d+/,
    sendAdminPayoutConfirmNoMessage
)

export default payout;