import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories";

export class UserController {
  async create(req: Request, res: Response) {
    const { login, password, email } = req.body;

    if (!login || !password || !email) {
      return res.status(400).json({ message: "Os campos login, password e email são obrigatórios!" });
    }

    const checkLogin = await userRepository.findOne({ where: { login: req.body.login } });

    if (checkLogin) {
      return res.status(400).json({ message: "Esse login já está sendo utilizado!" });
    }

    const checkEmail = await userRepository.findOne({ where: { email: req.body.email } });

    if (checkEmail) {
      return res.status(400).json({ message: "Esse email já está sendo utilizado!" });
    }

    const cryptedPassword = await bcrypt.hash(password, 8);

    try {
      const newUser = userRepository.create({ login, password: cryptedPassword, email });
      await userRepository.save(newUser);

      return res.status(201).json({ newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
