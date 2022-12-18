import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../database/configs/auth";
import { UnauthorizedError } from "../helpers/api-erros";

export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("JWT Token não informado!");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new UnauthorizedError("JWT Token não informado!");
  }

  const verified = verify(token, authConfig.jwt.secret);

  if (!verified) {
    throw new UnauthorizedError("JWT Token inválido!");
  }

  return next();
}
