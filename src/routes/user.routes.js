// Rota privada protegida
import { getProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

export default async function (fastify, opts) {
  fastify.post("/profile", { preHandler: [authenticate] }, getProfile);
}
