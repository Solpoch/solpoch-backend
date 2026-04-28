import { Elysia } from "elysia";

const errorPlugin = new Elysia()
  .onError(({ code, error }) => {
    if (code === 'VALIDATION')
      return error.message

    else return "An unexpected error occurred.";
  })