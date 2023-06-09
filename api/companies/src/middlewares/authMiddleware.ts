import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import env from './../dotenv';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, env.jwtSecret, (err) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    next();
  });
};