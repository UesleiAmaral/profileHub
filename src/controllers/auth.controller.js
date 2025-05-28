// Controller de autenticação
// Responsável pelo registro, login, verificação OTP e refresh
// Recebe: Dados do usuário (email, password, nome, etc.)

import { supabase } from "../services/supabase.service.js";

// REGISTRO + Envio de OTP (Email ou Celular)
export async function register(req, res) {
  const { email, password, name, avatar, bio } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ error: "Dados incompletos" });
  }

  // Envia os dados extras via metadata para serem salvos pela trigger
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar,
        bio,
      },
    },
  });

  if (error) {
    return res.status(400).send({ error: error.message });
  }

  return res.send({
    message: "Registro iniciado, verifique seu email para confirmar",
  });
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  }
);

  if (error) return res.status(400).send({ error: error.message });

  return res.send({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
}

// REFRESH TOKEN
export async function refresh(req, res) {
  const { refresh_token } = req.body;

  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) return res.status(400).send({ error: error.message });

  return res.send({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
}

// ACCESS TOKEN
// export async function accessToken(req, res) {
//   const { access_token } = req.body;

//   const { data, error } = await supabase.auth.

//   if (error) return res.status(400).send({ error: error.message });

//   return res.send(data);
// }
