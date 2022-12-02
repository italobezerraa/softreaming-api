import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { Movie } from "../entities/Movie";
import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);
export const categoryRepository = AppDataSource.getRepository(Category);
export const movieRepository = AppDataSource.getRepository(Movie);
export const profileRepository = AppDataSource.getRepository(Profile);
