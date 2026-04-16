import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Sanitizar o token para remover aspas extras (comum em alguns ambientes de deploy)
if (process.env.UPLOADTHING_TOKEN) {
  process.env.UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN.replace(/['"]+/g, "");
}

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
