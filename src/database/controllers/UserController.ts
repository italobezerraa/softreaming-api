import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories";
import { BadRequestError } from "../../helpers/api-erros";

class UserController {
  async create(req: Request, res: Response) {
    const { login, password, email } = req.body;
    const checkLogin = await userRepository.findOneBy({ login });
    const checkEmail = await userRepository.findOneBy({ email });

    if (!login || !password || !email) {
      throw new BadRequestError("Os campos login, password e email são obrigatórios!");
    } else if (checkLogin) {
      throw new BadRequestError("Esse login já está sendo utilizado!");
    } else if (checkEmail) {
      throw new BadRequestError("Esse email já está sendo utilizado!");
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({ login, password: cryptedPassword, email });
    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json({ user });
  }

  async listAll(req: Request, res: Response) {
    const user = await userRepository.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não não encontrado!" });
    }

    if (user.isSuperUser === true) {
      const listUsers = await userRepository.find();

      const filtredUsers = listUsers.map(({ id, login }) => ({ id, login }));

      return res.status(200).json(filtredUsers);
    } else {
      return res.status(401).json({ message: "Usuário não tem permissão!" });
    }
  }

  async listByOne(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (user !== null && user.isSuperUser === true) {
      const listUser = await userRepository.findOne({ where: { id: id }, relations: ["profiles"] });

      if (!listUser) {
        return res.status(400).json({ message: "Usuário não encontrado!" });
      } else {
        return res.status(200).json(listUser);
      }
    } else {
      return res.status(400).json({ message: "Usuário não tem pemissão para realizar essa operação!" });
    }
  }

  async update(req: Request, res: Response) {
    const { password, email } = req.body;

    const userId = req.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestError("Usuário não encontrado!");
    }

    if (password) {
      const cryptedPassword = await bcrypt.hash(password, 10);
      user.password = cryptedPassword;
    }

    if (email) user.email = email;

    userRepository.save(user);
    return res.status(200).json({ message: "Usuário atualizado!" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestError("Usuário não encontrado!");
    }

    const checkIdUser = await userRepository.findOne({ where: { id: id } });

    if (!checkIdUser) {
      return res.json({ message: "Usuário não encontrado!" });
    }

    if (user.isSuperUser === true) {
      await userRepository.softRemove(checkIdUser);
      return res.json({ message: "O usuário foi removido com sucesso!" });
    } else {
      return res.json({ message: "Usuário não tem pemissão para realizar essa operação!" });
    }
  }
}

export default new UserController();
