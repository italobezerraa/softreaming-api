import express from "express";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  console.log("Servidor rodando na porta 3333!");

  app.use(routes);

  return app.listen(process.env.PORT);
});
