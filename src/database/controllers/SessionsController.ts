import { Request, Response } from "express-serve-static-core";
import { userRepository } from "../repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../configs/auth";

class SessionsController {
  async create(req: Request, res: Response) {
    try {
      const { login, password } = req.body;

      const checkLogin = await userRepository.findOneBy({ login });

      if (!checkLogin) {
        return res.status(400).json("E-mail ou senha inválidos!");
      }

      const checkPassword = await bcrypt.compare(password, checkLogin.password);

      if (!checkPassword) {
        return res.status(400).json("E-mail ou senha inválidos!");
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = jwt.sign({ id: checkLogin.id }, secret, { expiresIn });

      const { password: _, ...userLogin } = checkLogin;

      return res.status(201).json({ userLogin, token });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SessionsController();
