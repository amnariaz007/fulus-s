import DatabaseHelper from "./DatabaseHelper.js";
import {getCleanJsonObject, getUnixTime} from "../utils/utils.js";
import {getLevelById} from "../utils/levelUtils.js";

const DEFAULT_DAILY_ENERGY = 1000;

class UserHelper extends DatabaseHelper {

    constructor(userTgId, fastify) {
        super(fastify);
        this.userTgId = userTgId;
    }

    async register(invitedTgId, language) {
        return this.query(
            "INSERT INTO `users`(`tgId`, `invitedTgId`, `completedTasks`, `boosts`, `registerTime`, `lastActivityTime`, `language`, `lastRestoreEnergyTime`, `energyLeft`, `dailyEnergy`) VALUES(?,?,?,?,?,?,?,?,?,?)",
            [this.userTgId, invitedTgId, getCleanJsonObject(), getCleanJsonObject(), getUnixTime(), getUnixTime(), language, getUnixTime(), DEFAULT_DAILY_ENERGY, DEFAULT_DAILY_ENERGY]
        );
    }

    async isRegister() {
        const result = await this.query(
            "SELECT * FROM `users` WHERE `tgId` = ?",
            [this.userTgId]
        );

        return Boolean(result[0]);
    }

    async get() {
        const data = await this.query(
            "SELECT * FROM `users` WHERE `tgId` = ?",
            [this.userTgId]
        );

        if (!data[0]) {
            return Promise.reject('user not found');
        }

        return data[0];
    }

    async set(key, value) {
        await this.query(
            "UPDATE `users` SET `"+key+"` = ? WHERE `tgId` = ?",
            [value, this.userTgId]
        );
    }

    async getGold() {
        const data = await this.get();
        return data['gold'];
    }

    async addGold(count) {
        const data = await this.get();
        return this.set('gold', data['gold'] + count);
    }

    async reduceGold(count) {
        const data = await this.get();

        let newRocketValue = data['gold'] - count;
        if (newRocketValue < 0) {
            return Promise.reject('not enough gold')
        }

        return this.set('gold', newRocketValue);
    }

    async getUSDT() {
        const data = await this.get();
        return data['usdt'];
    }

    async addUSDT(count) {
        const data = await this.get();
        return this.set('usdt', data['usdt'] + count);
    }

    async reduceUSDT(count) {
        const data = await this.get();

        let newRocketValue = data['usdt'] - count;
        if (newRocketValue < 0) {
            return Promise.reject('not enough usdt')
        }

        return this.set('usdt', newRocketValue);
    }

    async getLevel() {
        const data = await this.get();
        return getLevelById(data['level']);
    }

    async setLevel(levelId) {
        await this.set('level', levelId);

        const userData = await this.get();
        if (userData['invitedTgId'] !== null) {
            const invitedTgId = Number(userData['invitedTgId']);
            const inviteUser = new UserHelper(invitedTgId, this.fastify);

            const awards = {
                // level: gold
                1: 1000,
                2: 2000,
                3: 5000,
                4: 7000,
                5: 10000,
            };

            if (awards[levelId]) {
                return inviteUser.addGold(awards[levelId]);
            }
        }
    }

    async getEnergyLeft() {
        const data = await this.get();

        const time = getUnixTime() - data['lastRestoreEnergyTime'];
        if (time >= 1) {
            let newEnergy = Number(data['energyLeft']) + Number((data['rechargingEnergyPerSecond'] * time));

            if (newEnergy > data['dailyEnergy']) {
                newEnergy = data['dailyEnergy'];
            }

            await Promise.all([
                this.set('energyLeft', newEnergy),
                this.set('lastRestoreEnergyTime', getUnixTime()),
            ]);

            return newEnergy;
        }

        return data['energyLeft'];
    }

    async reduceEnergy(count) {
        const data = await this.get();

        let newEnergyValue = data['energyLeft'] - count;
        if (newEnergyValue < 0) {
            return Promise.reject('not enough energy')
        }

        return this.set('energyLeft', newEnergyValue);
    }

    async getGoldPerClick() {
        const data = await this.get();
        return data['goldPerClick'];
    }

    async getAutoclickEndTime() {
        const data = await this.get();
        const autoclickEndTime = data['autoclickEndTime'];

        if (autoclickEndTime < getUnixTime()) {
            await this.set('autoclickEndTime', null);
            return null;
        }

        return autoclickEndTime;
    }

    async getScore() {
        const userData = await this.get();

        const gold = userData['gold'];
        const level = getLevelById(userData['level']);
        const goldPerClick = userData['goldPerClick'];
        const dailyEnergy = userData['dailyEnergy'];
        const usdt = userData['usdt'];
        const rechargingEnergyPerSecond = userData['rechargingEnergyPerSecond'];

        const [
            energyLeft,
            autoclickEndTime
        ] = await Promise.all([
            this.getEnergyLeft(),
            this.getAutoclickEndTime(),
        ]);

        return {
            gold,
            level,
            energyLeft,
            goldPerClick,
            dailyEnergy,
            usdt,
            autoclickEndTime,
            rechargingEnergyPerSecond
        };
    }

    async getBoosts() {
        const data = await this.get();
        return JSON.parse(data.boosts);
    }

    async getBoostLevel(boost) {
        const boosts = await this.getBoosts();
        return boosts[boost] ?? 0;
    }

    async setBoostLevel(boost, level) {
        const boosts = await this.getBoosts();
        boosts[boost] = Number(level);

        return this.set('boosts', JSON.stringify(boosts));
    }

    async getCompletedTasks() {
        const data = await this.get();
        return JSON.parse(data['completedTasks']);
    }

    async getCompletedTasksByCategory(category) {
        const tasks = await this.getCompletedTasks();
        return tasks[category] ?? [];
    }

    async taskCompleted(category, id) {
        const tasks = await this.getCompletedTasks();
        if (!tasks[category]) {
            tasks[category] = [];
        }

        tasks[category].push(id);
        return this.set('completedTasks', JSON.stringify(tasks));
    }

    async getFriends() {
        return this.query(
            "SELECT `tgId` FROM `users` WHERE `invitedTgId` = ? ORDER BY `registerTime` DESC",
            [this.userTgId]
        );
    }

}

export default UserHelper;