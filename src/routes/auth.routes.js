//Rotas públicas de autenticação

import { register, login, refresh } from '../controllers/auth.controller.js';

export default async function (fastify, opts) {
    fastify.post('/register', register);
    fastify.post('/login', login);
    fastify.post('/refresh', refresh);
}
