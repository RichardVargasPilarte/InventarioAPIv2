import { PrismaClient } from '@prisma/client';
import { validate as isUUID } from 'uuid';
import bcrypt from 'bcryptjs';

import { transformToUid } from '../Helpers/transformToUid.js';
import { generarJWT } from '../Helpers/jwt.js';

const prisma = new PrismaClient();
const usuarioClient = new PrismaClient().usuario;

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioClient.findMany({
            where: {
                eliminado: 'NO'
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.status(200).json({ 
            usuarios
        });
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
    }
}

export const obtenerUsuarioId = async (req, res) => {
    try {
        const usuarioId = req.params.id;

        if (!isUUID(usuarioId)) {
            return res.status(400).send({ message: 'ID inválido' });
        }

        const usuario = await usuarioClient.findUnique({
            where: {
                id: usuarioId
            },
        });

        // Si no se encuentra el usuario, responder con un 404
        if (!usuario) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        // Si el usuario existe, devolver los datos
        res.status(200).json({ data: transformToUid(usuario) });

    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
    }
}

export const crearUsuario = async (req, res) => {
    try {
        const { username, email, telefono, password, ...data } = req.body;

        // Verificar si ya existe un usuario con username, email o teléfono
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                    { telefono }
                ]
            }
        });

        if (usuarioExistente) {
            if (usuarioExistente.username === username) {
                return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
            }
            if (usuarioExistente.email === email) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }
            if (usuarioExistente.telefono === telefono) {
                return res.status(400).json({ message: 'El número de teléfono ya está registrado.' });
            }
        }

        // Encriptar la contraseña antes de guardar el usuario
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear el usuario
        const usuario = await usuarioClient.create({
            data: {
                username,
                email,
                telefono,
                password: hashedPassword,
                ...data
            }
        });

        // Generar el token
        const token = await generarJWT({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            roles: usuario.rol,
            username: usuario.username,
            email: usuario.email
        });

        // Respuesta exitosa
        res.status(201).json({
            data: transformToUid(usuario),
            token
        });
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        res.status(500).json({
            message: 'Ocurrió un error al crear el usuario.',
            error: error.message
        });
    }
};
