import { Request, Response } from "express";
import { movieRepository } from "../repositories";

export class MovieController {
  async create(req: Request, res: Response) {
    const { name, description, yearRelease } = req.body;
    const checkMovie = await movieRepository.findOne({ where: { name: req.body.name } });

    if (!name) {
      return res.status(400).json({ message: "O campo nome é obrigatório!" });
    } else if (checkMovie) {
      return res.status(400).json({ message: "O filme já foi criado!" });
    }

    try {
      const newMovie = movieRepository.create({ name, description, yearRelease });

      await movieRepository.save(newMovie);

      return res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
