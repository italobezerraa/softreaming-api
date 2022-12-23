import { Router } from "express";
import CategoryController from "./database/controllers/CategoryController";
import SessionsController from "./database/controllers/SessionsController";
import MovieController from "./database/controllers/MovieController";
import UserController from "./database/controllers/UserController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import ProfileController from "./database/controllers/ProfileController";

const routes = Router();

// Category Routes
routes.post("/category", AuthMiddleware, CategoryController.create);
routes.get("/category", AuthMiddleware, CategoryController.listAll);
routes.get("/category/:id", AuthMiddleware, CategoryController.listByOne);
routes.put("/category/:id", AuthMiddleware, CategoryController.update);
routes.delete("/category/:id", AuthMiddleware, CategoryController.delete);

routes.get("/category/:id/movies", AuthMiddleware, CategoryController.moviesRequestByCategory);

// User Routes
routes.post("/user", UserController.create);
routes.get("/user", AuthMiddleware, UserController.listAll);
routes.get("/user/:id", AuthMiddleware, UserController.listByOne);
routes.patch("/user", AuthMiddleware, UserController.update);
routes.delete("/user/:id", AuthMiddleware, UserController.delete);

// Session Routes
routes.post("/login", SessionsController.create);

// Movie Routes
routes.post("/movie", AuthMiddleware, MovieController.create);
routes.get("/movie", AuthMiddleware, MovieController.listAll);
routes.get("/movie/:id", AuthMiddleware, MovieController.listByOne);
routes.patch("/movie/:id", AuthMiddleware, MovieController.update);
routes.delete("/movie/:id", AuthMiddleware, MovieController.delete);

// Profile Routes
routes.post("/profile", AuthMiddleware, ProfileController.create);
routes.get("/profile", AuthMiddleware, ProfileController.listProfilesByUser);
routes.patch("/profile/:id", AuthMiddleware, ProfileController.update);
routes.delete("/profile/:id", AuthMiddleware, ProfileController.delete);

export default routes;
