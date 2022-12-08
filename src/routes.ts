import { Router } from "express";
import { CategoryController } from "./database/controllers/CategoryController";
import { LoginController } from "./database/controllers/LoginController";
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

// Login Routes
routes.post("/login", new LoginController().login);

// Movie Routes
routes.post("/movie", new MovieController().create);

export default routes;
