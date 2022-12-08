import { Request, Response } from "express-serve-static-core";
import { userRepository } from "../repositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../../helpers/api-erros";

export class LoginController {
  async login(req: Request, res: Response) {
    const { login, password } = req.body;

    const checkLogin = await userRepository.findOneBy({ login });

    if (!checkLogin) {
      throw new BadRequestError("E-mail ou senha inválidos!");
    }

    const checkPassword = await bcrypt.compare(password, checkLogin.password);

    if (!checkPassword) {
      throw new BadRequestError("E-mail ou senha inválidos!");
    }

    const token = jwt.sign({ id: checkLogin.id }, process.env.JWT_PASS ?? "", { expiresIn: "8h" });

    const { password: _, ...userLogin } = checkLogin;

    return res.json({
      user: userLogin,
      token: token,
    });
  }
}
