import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
}
