import { validationResult } from 'express-validator';

// Define el middleware para validar los campos
export const validarCampos = (req, res, next) => {
    // Obtén los errores de la validación
    const errores = validationResult(req);

    // Si hay errores, envía una respuesta con el estado 400 y los errores
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // Si no hay errores, continúa con la siguiente función de middleware
    next();
};
