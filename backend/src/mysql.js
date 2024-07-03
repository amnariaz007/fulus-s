import mysql from 'mysql2/promise';

let connection;

const createPool = () => {
    const str = process.env.DATABASE_CONNECTION_STRING;

    return mysql.createPool({
        uri: str,
        waitForConnections: true,
        connectionLimit: 10000,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    });
}

const getConnection = async () => {
    if (typeof connection !== "undefined") {
        return connection;
    }

    connection = await createPool();

    console.log('mysql connect');

    return connection;
}

export default getConnection;