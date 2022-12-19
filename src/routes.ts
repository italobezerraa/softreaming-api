import { Router } from "express";
import CategoryController from "./database/controllers/CategoryController";
import { SessionsController } from "./database/controllers/SessionsController";
import MovieController from "./database/controllers/MovieController";
import { UserController } from "./database/controllers/UserController";

const routes = Router();

// Category Routes
routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.listAll);
routes.get("/category/:id", CategoryController.listByOne);
routes.put("/category/:id", CategoryController.update);
routes.delete("/category/:id", CategoryController.delete);

routes.get("/category/:id/movies", CategoryController.moviesRequest);

// User Routes
routes.post("/user", new UserController().create);

// Session Routes
routes.post("/login", new SessionsController().create);

// Movie Routes
routes.post("/movie", MovieController.create);
routes.get("/movie", MovieController.listAll);
routes.get("/movie/:id", MovieController.listByOne);
routes.patch("/movie/:id", MovieController.update);
routes.delete("/movie/:id", MovieController.delete);

export default routes;
