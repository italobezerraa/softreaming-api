import { Request } from "express";

export interface userIdRequest extends Request {
  user: {
    id: number;
  };
}
