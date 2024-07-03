import DatabaseHelper from "./DatabaseHelper.js";
import {getStartOfDay} from "../utils/utils.js";

class SystemHelper extends DatabaseHelper {

    getData = async () => {
        const result = await this.query("SELECT * FROM `system` WHERE `id` = 1");
        return result[0];
    }

    getAdmins = async () => {
        const data = await this.getData();
        return JSON.parse(data['admins']);
    }

    setAdmins = async (ids) => {
        return this.query(
            "UPDATE `system` SET `admins` = ? WHERE `id` = 1",
            [JSON.stringify(ids)]
        )
    }

    isAdmin = async (tgId) => {
        const admins = await this.getAdmins();
        return admins.includes(tgId);
    }

    getTotalClicksCount = async () => {
        const data = await this.getData();
        return data['totalClicks'];
    }

    // todo: very slow
    addTotalClicksCount = async (count) => {
        const data = await this.getData();

        return this.query(
            "UPDATE `system` SET `totalClicks` = ? WHERE `id` = 1",
            [data['totalClicks'] + Number(count)]
        )
    }

    getTotalUsersCount = async () => {
        const result = await this.query(
            "SELECT COUNT(*) AS `row_count` FROM `users`"
        )

        return result[0]['row_count'];
    }

    getTodayUsersCount = async () => {
        const result = await this.query(
            "SELECT COUNT(*) AS `row_count` FROM `users` WHERE `registerTime` >= ?",
            [getStartOfDay()]
        )

        return result[0]['row_count'];
    }

}

export default SystemHelper;