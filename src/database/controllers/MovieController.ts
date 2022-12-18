import { Request, Response } from "express";
import { movieRepository } from "../repositories";
import CategoryController from "./CategoryController";

class MovieController {
  async create(req: Request, res: Response) {
    const { name, description, yearRelease, categories } = req.body;
    const checkMovie = await movieRepository.findOne({ where: { name: req.body.name } });
    const checkCategories = await CategoryController.listByIds(categories);

    if (!name || !description || !yearRelease || !checkCategories) {
      return res.status(400).json({ message: "Campos obrigatórios estão faltando!" });
    } else if (checkMovie) {
      return res.status(400).json({ message: "O filme já foi criado!" });
    }

    try {
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

  async list(req: Request, res: Response) {
    const listMovie = await movieRepository.find({
      relations: ["categories"],
    });
    return res.status(200).json(listMovie);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, yearRelease } = req.body;

    const updateMovie = await movieRepository.findOne({ where: { id: id } });

    if (!updateMovie) {
      return res.status(400).json({ message: "Filme não encontrado!" });
    }

    if (name) updateMovie.name = name;
    if (description) updateMovie.description = description;
    if (yearRelease) updateMovie.yearRelease = yearRelease;

    movieRepository.save(updateMovie);
    return res.status(200).json({ message: "Filme atualizado!" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const checkIdMovie = await movieRepository.findOne({ where: { id: id } });

    if (!checkIdMovie) {
      return res.json({ message: "Error: Filme não existe!" });
    } else {
      await movieRepository.softRemove(checkIdMovie);
      return res.json({ message: "O filme foi removido!" });
    }
  }
}

export default new MovieController();
