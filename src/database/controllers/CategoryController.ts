import { Request, Response } from "express";
import { categoryRepository } from "../repositories";

export class CategoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const checkCategory = await categoryRepository.findOne({ where: { name: req.body.name } });

    if (!name) {
      return res.status(400).json({ message: "O campo nome é obrigatório!" });
    } else if (checkCategory) {
      return res.status(400).json({ message: "A categoria já foi criada!" });
    }

    try {
      const newCategory = categoryRepository.create({ name });

      await categoryRepository.save(newCategory);

      return res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
