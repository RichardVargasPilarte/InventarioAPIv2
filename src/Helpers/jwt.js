import jwt from 'jsonwebtoken';

// Verificar si las variables de entorno están disponibles
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en el archivo .env');
}

export const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        const { password, ...payload } = usuario;

        // Firmar el JWT usando la clave secreta
        jwt.sign(
            payload,
            process.env.JWT_SECRET,  // Usar la variable de entorno JWT_SECRET
            {
                expiresIn: process.env.JWT_EXPIRES_IN,  // Tiempo de expiración
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al generar token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
