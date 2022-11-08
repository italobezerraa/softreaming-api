import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);
export const categoryRepository = AppDataSource.getRepository(Category);
