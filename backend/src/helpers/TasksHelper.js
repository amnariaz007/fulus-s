import DatabaseHelper from "./DatabaseHelper.js";

class TasksHelper extends DatabaseHelper {

    async getTasks() {
        return this.query("SELECT * FROM `tasks`");
    }

    async getTaskById(id) {
        const result = await this.query(
            "SELECT * FROM `tasks` WHERE `id` = ?",
            [id]
        );

        return result[0] ?? null;
    }

    async updateTask(id, channelAddress, link, award, title) {
        return this.query(
            "UPDATE `tasks` SET `channelAddress` = ?, `link` = ?, `award` = ?, `title` = ?, WHERE `id` = ?",
            [channelAddress, link, Number(award), title, id]
        );
    }

    async deleteTask(id) {
        return this.query(
            "DELETE FROM `tasks` WHERE `id` = ?",
            [id]
        );
    }

    async createTask(channelAddress, link, award, title) {
        return this.query(
            "INSERT INTO `tasks`(`channelAddress`, `link`, `award`, `title`) VALUES(?, ?, ?, ?)",
            [channelAddress, link, Number(award), title]
        );
    }

}

export default TasksHelper;