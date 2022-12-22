import { Router } from "express";
import CategoryController from "./database/controllers/CategoryController";
import SessionsController from "./database/controllers/SessionsController";
import MovieController from "./database/controllers/MovieController";
import UserController from "./database/controllers/UserController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import ProfileController from "./database/controllers/ProfileController";

const routes = Router();

// Category Routes
routes.post("/category", CategoryController.create);
routes.get("/category", CategoryController.listAll);
routes.get("/category/:id", CategoryController.listByOne);
routes.put("/category/:id", CategoryController.update);
routes.delete("/category/:id", CategoryController.delete);

routes.get("/category/:id/movies", CategoryController.moviesRequestByCategory);

// User Routes
routes.post("/user", UserController.create);
routes.get("/user", AuthMiddleware, UserController.listAll);
routes.get("/user/:id", AuthMiddleware, UserController.listByOne);
routes.patch("/user", AuthMiddleware, UserController.update);
routes.delete("/user/:id", AuthMiddleware, UserController.delete);

// Session Routes
routes.post("/login", SessionsController.create);

// Movie Routes
routes.post("/movie", MovieController.create);
routes.get("/movie", MovieController.listAll);
routes.get("/movie/:id", MovieController.listByOne);
routes.patch("/movie/:id", MovieController.update);
routes.delete("/movie/:id", MovieController.delete);

// Profile Routes
routes.post("/profile", AuthMiddleware, ProfileController.create);
routes.get("/profile", AuthMiddleware, ProfileController.listProfilesByUser);
routes.patch("/profile/:id", AuthMiddleware, ProfileController.update);
routes.delete("/profile/:id", AuthMiddleware, ProfileController.delete);

export default routes;
