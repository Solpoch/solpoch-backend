import { Elysia } from "elysia";
import { aiControllers } from "./modules/ai";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello Elysia")
  .use(aiControllers)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);