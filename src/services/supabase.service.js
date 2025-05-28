// Responsável por inicializar o cliente e centralizar o acesso à API do Supabase

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Criação do cliente supabase com anon key (acesso público controlado)
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
);

// Criação de um client privilegiado com service role (NUNCA use no frontend)
export const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);
