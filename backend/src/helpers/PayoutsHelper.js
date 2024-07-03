import DatabaseHelper from "./DatabaseHelper.js";
import {getStartOfDay, getUnixTime} from "../utils/utils.js";

class PayoutsHelper extends DatabaseHelper {

    async create(userId, token, network, count, address) {
        const response = await this.query(
            "INSERT INTO payouts (userId, token, network, count, address, createdTime) VALUES(?,?,?,?,?,?)",
            [userId, token, network, count, address, getUnixTime()]
        );

        return response.insertId;
    }

    async getPayout(id) {
        const result = await this.query(
            "SELECT * FROM `payouts` WHERE `id` = ?",
            [id]
        );

        return result[0] ?? null;
    }

    async updateStatus(id, status) {
        return this.query("UPDATE `payouts` SET `status` = ? WHERE `id` = ?", [status, id]);
    }

    async getUserTodayPayoutsSum(userId) {
        const response = await this.query(
            "SELECT SUM(`count`) as `total_count` FROM `payouts` WHERE `type` = 'rocket' AND `userId` = ? AND `createdTime` >= ?",
            [userId, getStartOfDay()]
        );

        return response[0]['total_count'] ?? 0;
    }

}

export default PayoutsHelper;