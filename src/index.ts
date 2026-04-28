import { Elysia } from "elysia";
import { aiControllers } from "./modules/ai";

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello Elysia")
  .use(aiControllers)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
