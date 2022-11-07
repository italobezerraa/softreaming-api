import { Router } from "express";
import { CategoryController } from "./database/controllers/CategoryController";

const routes = Router();

routes.post("/category", new CategoryController().create);

export default routes;
