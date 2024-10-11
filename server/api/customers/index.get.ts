import { connectToDB } from '../../db/db.js';
import sql from 'mssql';

export default defineEventHandler(async () => {
    try {
        const pool = await connectToDB();
        const result = await pool.request()
            .query("SELECT CustomerID, FirstName + ' ' + LastName AS FullName, EmailAddress FROM SalesLT.Customer"); //ConsultaSQL

        return result.recordset; // Retorna los registros obtenidos
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        throw createError({
            statusCode: 500,
            message: "Error al obtener los clientes",
        });
    }
});
