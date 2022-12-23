import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { login, password, email } = req.body;
      const checkLogin = await userRepository.findOneBy({ login });
      const checkEmail = await userRepository.findOneBy({ email });

      if (!login || !password || !email) {
        return res.status(400).json("Os campos login, password e email são obrigatórios!");
      } else if (checkLogin) {
        return res.status(400).json("Esse login já está sendo utilizado!");
      } else if (checkEmail) {
        return res.status(400).json("Esse email já está sendo utilizado!");
      }

      const cryptedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({ login, password: cryptedPassword, email });
      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const user = await userRepository.findOne({ where: { id: req.userId } });

      if (!user) {
        return res.status(401).json({ message: "Usuário não foi encontrado!" });
      }

      if (user.isSuperUser === true) {
        const listUsers = await userRepository.find();

        const filtredUsers = listUsers.map(({ id, login }) => ({ id, login }));

        return res.status(200).json(filtredUsers);
      } else {
        return res.status(401).json({ message: "O usuário não tem permissão para fazer essa operação!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listByOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (user !== null && user.isSuperUser === true) {
        const listUser = await userRepository.findOne({ where: { id: id }, relations: ["profiles"] });

        if (!listUser) {
          return res.status(404).json({ message: "Usuário não foi encontrado!" });
        } else {
          return res.status(200).json(listUser);
        }
      } else {
        return res.status(401).json({ message: "Usuário não tem pemissão para realizar essa operação!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const userId = req.userId;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json("Usuário não encontrado!");
      }

      if (password) {
        const cryptedPassword = await bcrypt.hash(password, 10);
        user.password = cryptedPassword;
      }

      if (email) user.email = email;

      await userRepository.save(user);
      return res.status(200).json({ message: "Usuário atualizado!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json("Usuário não foi encontrado!");
      }

      const checkIdUser = await userRepository.findOne({ where: { id: id } });

      if (!checkIdUser) {
        return res.json({ message: "Usuário não encontrado!" });
      }

      if (user.isSuperUser === true) {
        await userRepository.softRemove(checkIdUser);
        return res.json({ message: "O usuário foi removido com sucesso!", user: user });
      } else {
        return res.json({ message: "Usuário não tem pemissão para realizar essa operação!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new UserController();
