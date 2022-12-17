import { Router } from "express";
import { CategoryController } from "./database/controllers/CategoryController";
import { SessionsController } from "./database/controllers/SessionsController";
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

// Session Routes
routes.post("/login", new SessionsController().create);

// Movie Routes
routes.post("/movie", new MovieController().create);
routes.get("/movie", new MovieController().list);
routes.patch("/movie/:id", new MovieController().update);
routes.delete("/movie/:id", new MovieController().delete);

export default routes;
