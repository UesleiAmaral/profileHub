// Middleware de Autenticação
// Função responsável por validar o JWT do Supabase
// Objetivo: Validar a autenticidade do token antes de acessar rotas privadas

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware
export async function authenticate(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        // Verificação do JWT
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET, {
            algorithms: ['HS256'], // esse é o algoritmo padrão do Supabase
          });

          
        // Anexa o payload do token ao request para uso posterior
        
        req.user = decoded;

    } catch (error) {
        return res.status(401).send({ error: 'Token inválido ou expirado' });
    }
}

