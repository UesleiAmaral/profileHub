// Inicializa o servidor e carrega as rotas
import fastify from 'fastify';

// Registro das rotas da aplicação
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

// Cria a instância do servidor Fastify
const app = fastify();

import fastifyCors from '@fastify/cors'

await app.register(fastifyCors, {
  origin: "http://localhost:3000", //especifique o frontend
})


// Carregar as rotas no Fastify
app.register(authRoutes, { prefix: '/auth' }); // Rotas de autenticação
app.register(userRoutes, { prefix: '/user' }); // Rotas privadas de usuário

// Start do servidor
app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Server Is Running! ${address}`);
});


































































// import Fastify from "fastify";
// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";
// dotenv.config();

// const app = Fastify();






// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Rota de exemplo para obter dados do usuário autenticado

// // REGISTER
// app.post("/auth/register", async (req, res) => {
//   const { email, name, avatar = null, bio = null, password } = req.body || {};

//   if (!email || !name || !password) {
//     return res.status(400).send({ error: "Missing required fields" });
//   }

//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error) {
//     return res.status(400).send({ error: error.message });
//   }

//   const user_id = data.user.id;

//   const newUser = {
//     user_id,
//     email,
//     name,
//     avatar,
//     bio,
//   };

//   const { error: insertError } = await supabase.from("users").insert([newUser]);

//   if (insertError) {
//     return res.status(500).send({ error: insertError.message });
//   }

//   return res
//     .status(201)
//     .send({ message: "User registered successfully", user_id });
// });

// // LOGIN
// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body || {};

//   if (!email || !password) {
//     return res.status(400).send({ error: "Missing email or password" });
//   }

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error || !data.user) {
//     return res.status(401).send({ error: "Invalid email or password" });
//   }

//   const user_id = data.user.id;

//   const { data: users, error: userError } = await supabase
//     .from("users")
//     .select("*")
//     .eq("user_id", user_id)
//     .single();

//   if (userError) {
//     return res.status(404).send({ error: "User data not found" });
//   }

//   return res.status(200).send(users);
// });

// app
//   .listen({
//     port: 3333,
//   })
//   .then(() => {
//     console.log("Server is Running!");
//   });
