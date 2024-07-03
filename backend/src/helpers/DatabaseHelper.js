import getConnection from "../mysql.js";

class DatabaseHelper {

    constructor(fastify) {
        this.fastify = fastify;
    }

    async query(sql, params = []) {
        let before, after, resultTime;

        try {
            before = Date.now();
            const connection = await getConnection();
            after = Date.now();
            resultTime = after - before;

            if (resultTime > 500)
                console.log(`Get mysql connection time: ${resultTime} ms`)

            before = Date.now();
            const [rows, fields] = await connection.query(sql, params);
            after = Date.now();
            resultTime = after - before;

            if (resultTime > 1000)
                console.log(`MYSQL query time: ${resultTime} ms  |  ${sql}`);

            //await connection.release();
            return rows;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

export default DatabaseHelper;