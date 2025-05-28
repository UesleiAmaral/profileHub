// Controller de usuários
// Rota protegida: Retorna as informações APENAS do usuário autenticado

import { supabaseAdmin } from '../services/supabase.service.js';

export async function getProfile(req, res) {
    const user_id = req.user.sub; // ID vindo do JWT

    // Verifica se o ID do usuário existe
    if (!user_id) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    // Busca o usuário no banco de dados
    const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .maybeSingle();

        // Busca todos os projetos do usuario no banco de dados
    const projects = await getProject(user_id);
    
    // Verifica se houve erro na busca
    if (error) {
        console.error('[ERROR]', error.message);
        return res.status(500).send({ error: 'Erro ao buscar usuário' });
    }

    return res.send({user, projects});
    
}

const getProject = async (user_id)=>{
    const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('user_id', user_id)

    return data;
    
}
