import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../database/configs/auth";
import { UnauthorizedError } from "../helpers/api-erros";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("JWT Token não informado ou não existe!");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new UnauthorizedError("JWT Token não informado!");
  }

  try {
    const validToken = verify(token, authConfig.jwt.secret);

    const { id } = validToken as TokenPayload;

    req.userId = id;
    // req.user = {
    //   id: Number(user_id),
    // };

    return next();
  } catch (error) {
    throw new UnauthorizedError("JWT Token inválido!");
  }
}
