import { Router } from "express";
import { CategoryController } from "./database/controllers/CategoryController";
import { UserController } from "./database/controllers/UserController";

const routes = Router();

routes.post("/category", new CategoryController().create);
routes.post("/user", new UserController().create);

export default routes;
