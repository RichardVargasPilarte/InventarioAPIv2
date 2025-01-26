// Función para verificar la existencia de un campo en la base de datos
export const verificarExistencia = async (campo, valor, prismaClient) => {
    // Validar que el valor no esté vacío
    if (!valor || valor.trim() === '') {
        throw new Error('El valor para la búsqueda no puede ser nulo o vacío');
    }

    // Validar que el campo sea uno de los permitidos
    const camposPermitidos = ['nombre', 'username', 'email'];
    if (!camposPermitidos.includes(campo)) {
        throw new Error('Campo no válido para la búsqueda');
    }

    // Construir el objeto where dinámicamente
    const where = { [campo]: valor };

    try {
        // Realizar la consulta en Prisma
        const resultado = await prismaClient.usuario.findUnique({
            where,
        });

        return resultado;
    } catch (error) {
        // Manejar errores de la consulta
        throw new Error(`Error al verificar existencia: ${error.message || 'Error desconocido'}`);
    }
};
