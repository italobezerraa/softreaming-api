import { Request, Response } from "express";
import { In } from "typeorm";
import { categoryRepository } from "../repositories";

class CategoryController {
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

  async listAll(req: Request, res: Response) {
    const listCategory = await categoryRepository.find();

    const filtredCategoryList = listCategory.map(({ id, name }) => ({ id, name }));

    return res.status(200).json(filtredCategoryList);
  }

  async listByOne(req: Request, res: Response) {
    const { id } = req.params;
    const listCategory = await categoryRepository.findOne({ where: { id: id } });

    if (!listCategory) {
      return res.status(400).json({ message: "Categoria não encontrada!" });
    }

    return res.status(200).json(listCategory);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const updateCategory = await categoryRepository.findOne({ where: { id: id } });

    if (!updateCategory) {
      return res.status(400).json({ message: "Categoria não encontrada!" });
    } else {
      updateCategory.name = name;
      categoryRepository.save(updateCategory);
      return res.status(200).json({ message: "Categoria atualizada!" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const checkIdCategory = await categoryRepository.findOne({ where: { id: id } });

    if (!checkIdCategory) {
      return res.json({ message: "Error: Categoria não existe!" });
    } else {
      await categoryRepository.softRemove(checkIdCategory);
      return res.json({ message: "A categoria foi removida!" });
    }
  }

  async moviesRequestByCategory(req: Request, res: Response) {
    const { id } = req.params;

    const listOfMoviesByCategory = await categoryRepository
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.movies", "movies")
      .select([
        "category.id",
        "category.name",
        "movies.id",
        "movies.name",
        "movies.description",
        "movies.yearRelease",
      ])
      .where("category.id = :id", { id: id })
      .getMany();

    return res.json(listOfMoviesByCategory);
  }

  async listByIds(ids: number[]) {
    const categories = categoryRepository.find({ where: { id: In(ids) } });
    return categories;
  }
}

export default new CategoryController();
