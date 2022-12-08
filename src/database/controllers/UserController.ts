import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories";
import { BadRequestError } from "../../helpers/api-erros";

export class UserController {
  async create(req: Request, res: Response) {
    const { login, password, email } = req.body;
    const checkLogin = await userRepository.findOne({ where: { login: req.body.login } });
    const checkEmail = await userRepository.findOne({ where: { email: req.body.email } });

    if (!login || !password || !email) {
      throw new BadRequestError("Os campos login, password e email são obrigatórios!");
    } else if (checkLogin) {
      throw new BadRequestError("Esse login já está sendo utilizado!");
    } else if (checkEmail) {
      throw new BadRequestError("Esse email já está sendo utilizado!");
    }

    const cryptedPassword = await bcrypt.hash(password, 8);

    const newUser = userRepository.create({ login, password: cryptedPassword, email });
    await userRepository.save(newUser);

    return res.status(201).json({ newUser });
  }
}
