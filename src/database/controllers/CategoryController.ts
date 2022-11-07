import { Request, Response } from "express";
import { categoryRepository } from "../repositories/categoryRepository";

export class CategoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O campo nome é obrigatório!" });
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
