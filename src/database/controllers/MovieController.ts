import { Request, Response } from "express";
import { movieRepository, userRepository } from "../repositories";
import CategoryController from "./CategoryController";

class MovieController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      let { name, description, yearRelease, categories } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });
      const checkMovie = await movieRepository.findOne({ where: { name: req.body.name } });

      if (user?.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      if (!categories) categories = [12];

      const checkCategories = await CategoryController.listByIds(categories);

      if (!name || !description || !yearRelease) {
        return res.status(400).json({ message: "Campos obrigatórios estão faltando!" });
      } else if (checkMovie) {
        return res.status(400).json({ message: "O filme já foi criado!" });
      }

      const newMovie = movieRepository.create({
        name,
        description,
        yearRelease,
        categories: checkCategories,
      });

      await movieRepository.save(newMovie);

      return res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não foi encontrado!" });
      }

      if (user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }
      const movies = await movieRepository
        .createQueryBuilder("movie")
        .leftJoinAndSelect("movie.categories", "categories")
        .select([
          "movie.id",
          "movie.name",
          "movie.description",
          "movie.yearRelease",
          "categories.id",
          "categories.name",
        ])
        .getMany();

      return res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listByOne(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não foi encontrado!" });
      }

      if (user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      const listMovie = await movieRepository.findOne({
        where: { id: id },
        relations: ["categories"],
      });

      return res.status(200).json(listMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { name, description, yearRelease, categories } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não não encontrado!" });
      }

      if (user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      const updateMovie = await movieRepository.findOne({ where: { id: id } });
      const checkCategories = await CategoryController.listByIds(categories);

      if (!updateMovie) {
        return res.status(404).json({ message: "Filme não foi encontrado!" });
      }

      if (name) updateMovie.name = name;
      if (description) updateMovie.description = description;
      if (yearRelease) updateMovie.yearRelease = yearRelease;
      if (categories) updateMovie.categories = checkCategories;

      movieRepository.save(updateMovie);
      return res.status(200).json({ message: "Filme atualizado!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não foi encontrado!" });
      }

      if (user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      const checkIdMovie = await movieRepository.findOne({ where: { id: id } });

      if (!checkIdMovie) {
        return res.status(404).json({ message: "Filme não foi encontrado!" });
      } else {
        await movieRepository.softRemove(checkIdMovie);
        return res.status(200).json({ message: "O filme foi removido!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new MovieController();
