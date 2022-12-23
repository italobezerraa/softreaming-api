import { Request, Response } from "express";
import { In } from "typeorm";
import { categoryRepository, userRepository } from "../repositories";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { name } = req.body;

      const checkCategory = await categoryRepository.findOne({ where: { name: req.body.name } });
      const user = await userRepository.findOne({ where: { id: userId } });

      if (user !== null && user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      if (!name) {
        return res.status(400).json({ message: "O campo nome é obrigatório!" });
      } else if (typeof name !== "string") {
        return res.status(400).json({ message: "O nome da categoria precisa ser uma string!" });
      } else if (name.length > 20) {
        return res.status(400).json({ message: "O nome da categoria não pode ter mais do que 20 caracteres!" });
      } else if (checkCategory) {
        return res.status(400).json({ message: "A categoria já foi criada!" });
      }

      const newCategory = categoryRepository.create({ name });

      await categoryRepository.save(newCategory);

      return res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user?.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      const listCategory = await categoryRepository.find();

      const filtredCategoryList = listCategory.map(({ id, name }) => ({ id, name }));

      return res.status(200).json(filtredCategoryList);
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

      if (user?.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      const listCategory = await categoryRepository.findOne({ where: { id: id } });

      if (!listCategory) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      }

      return res.status(200).json(listCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { name } = req.body;

      const updateCategory = await categoryRepository.findOne({ where: { id: id } });

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user?.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      if (!updateCategory) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      } else {
        updateCategory.name = name;
        categoryRepository.save(updateCategory);
        return res.status(200).json({ message: "Categoria atualizada!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      const checkIdCategory = await categoryRepository.findOne({ where: { id: id } });

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user?.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

      if (!checkIdCategory) {
        return res.status(404).json({ message: "Categoria não encontrada!" });
      } else {
        await categoryRepository.softRemove(checkIdCategory);
        return res.status(200).json({ message: "A categoria foi removida!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async moviesRequestByCategory(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user !== null && user.isSuperUser === false) {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }

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
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listByIds(ids: number[]) {
    const categories = categoryRepository.find({ where: { id: In(ids) } });
    return categories;
  }
}

export default new CategoryController();
