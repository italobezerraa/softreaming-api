import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class UserController {
  async create(req: Request, res: Response) {
    const { login, password, email } = req.body;

    if (!login || !password || !email) {
      return res.status(400).json({ message: "Os campos login, password e email são obrigatórios!" });
    }

    const cryptedPassword = await bcrypt.hash(password, 4);

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
