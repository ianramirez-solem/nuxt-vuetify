// db.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000
    },
};

let pool = null;

export async function connectToDB() {
    if (!pool) {
        try {
            pool = await sql.connect(config);
            console.log("Conectado a la base de datos de Azure SQL");
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }
    return pool;
}
