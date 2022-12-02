import { Router } from "express";
import { CategoryController } from "./database/controllers/CategoryController";
import { MovieController } from "./database/controllers/MovieController";
import { UserController } from "./database/controllers/UserController";

const routes = Router();

// Category Routes
routes.post("/category", new CategoryController().create);
routes.get("/category", new CategoryController().list);
routes.put("/category/:id", new CategoryController().update);
routes.delete("/category/:id", new CategoryController().delete);

// User Routes
routes.post("/user", new UserController().create);

// Movie Routes
routes.post("/movie", new MovieController().create);

export default routes;
