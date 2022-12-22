import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../database/configs/auth";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(201).json("JWT Token não informado ou não existe!");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(201).json("JWT Token não informado!");
  }

  try {
    const validToken = verify(token, authConfig.jwt.secret);

    const { id } = validToken as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(201).json("JWT Token inválido!");
  }
}
