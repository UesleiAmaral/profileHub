# API de Autenticação com Supabase e Fastify

---

## 📄 Visão Geral

API backend criada em Fastify que integra autenticação segura com Supabase Auth (incluindo suporte a OTP por email e SMS).

---

## 🛡️ Tecnologias Utilizadas
- [Fastify](https://fastify.dev/)
- [Supabase](https://supabase.com/) (Auth, JWT, OTP, Refresh Tokens)
- [JWKS](https://datatracker.ietf.org/doc/html/rfc7517) (para validar JWTs via URL)

---

## 🌐 Endpoints

### 1. **POST /auth/register**
Registra o usuário no Supabase e cria entrada na tabela `users`

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senhaSegura123",
  "name": "Nome do Usuário",
  "avatar": "URL opcional",
  "bio": "bio opcional"
}
```

**Resposta:**
```json
{
  "message": "Confirmação enviada por email"
}
```

---

### 2. **POST /auth/login**
Realiza login via Supabase Auth e retorna tokens + user

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senhaSegura123"
}
```

**Resposta:**
```json
{
  "access_token": "jwt...",
  "refresh_token": "...",
  "user": {
    "id": "uuid",
    "email": "...",
    "name": "..."
  }
}
```

---

### 3. **POST /auth/refresh**
Gera novo access token a partir do refresh

**Body:**
```json
{
  "refresh_token": "..."
}
```

**Resposta:**
```json
{
  "access_token": "novoJWT",
  "user": { ... }
}
```

---

### 4. **GET /profile**
Retorna dados do usuário autenticado

**Header:**
```http
Authorization: Bearer {access_token}
```

**Resposta:**
```json
{
  "user_id": "...",
  "email": "...",
  "name": "...",
  "avatar": "...",
  "bio": "..."
}
```

---

## 🔒 Segurança Implementada
- JWT validado com JWKS (sem gerar tokens manualmente)
- Middleware de autenticação e autorização
- Rate limiter por IP
- Confirmação via OTP (email/SMS)
- Refresh Token nativo do Supabase (sem rotação própria)

---

## 🎓 Fluxo Completo
```text
[FRONTEND] ➔ POST /auth/register ➔ [Supabase envia OTP]
         ➔ Confirmação por email
         ➔ POST /auth/login ➔ access_token + refresh_token
         ➔ GET /profile (autenticado)
         ➔ POST /auth/refresh (quando access_token expirar)
```

---
---

## 📖 Referências
- Supabase Docs: https://supabase.com/docs
- Fastify Auth: https://fastify.dev/docs/latest/Reference/Authentication/
- JWT & JWKS: https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets

---
