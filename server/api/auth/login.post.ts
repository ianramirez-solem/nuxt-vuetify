import bcrypt from 'bcrypt';
import { connectToDB } from '../../db/db.js';
import sql from 'mssql';

/* const userTest = [ {id: 1, name: 'ian', fullName: 'Ian Ramirez', passw: '$2b$10$ekogNQ3CWCMVqmKA7UPMteBsdCfOEziNy1VP0YPyCnCIdkYcjbytG', avatar: faker.image.avatar(), rut: "12.345.678-9", doc: "123.456.789" },
  { id: 2, name: 'test', fullName: 'Nombre test', passw: '$2b$10$mVpSDRDSVkOOJnHKmdmFTeCFK4mB7axs/JnQtET7QrPy29vZ3BCd.', avatar: faker.image.avatar(), rut: "98.765.432-1", doc: "987.654.321"},
]; */

export default defineEventHandler(async (event) => {
    const { name, password } = await readBody(event);
    
    const pool = await connectToDB();
    
    try {
        // Realiza una consulta para buscar al usuario por nombre
        const result = await pool.request()
            .input('name', sql.NVarChar, name) // Asegúrate de que el tipo de dato coincida con tu esquema
            .query('SELECT * FROM usuarios WHERE name = @name');

        const user = result.recordset[0]; // Obtiene el primer resultado

        // Verifica si se encontró al usuario
        if (!user) {
            return sendError(event, createError({
                statusCode: 401, // Devolver 401 si las credenciales son incorrectas
                statusMessage: 'Credenciales incorrectas',
            }));
        }

        // Compara la contraseña ingresada con la almacenada
        const isValidPassword = await bcrypt.compare(password, user.passw);

        if (!isValidPassword) {
            return sendError(event, createError({
                statusCode: 401, // Devolver 401 si las credenciales son incorrectas
                statusMessage: 'Credenciales incorrectas',
            }));
        }

        // Si las credenciales son correctas, establece la sesión y retorna solo el usuario.
        await setUserSession(event, {
            user: user, // Guardamos el usuario en la sesión
            loggedInAt: new Date(),
        });

        return { message: 'Sesión iniciada correctamente', user }; // Retorna el usuario autenticado
    } catch (error) {
        console.error(error.message);
        throw new Error('Error en la autenticación: ' + error.message);
    } 
});
