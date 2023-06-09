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
    res.status(401).json({ message: "The token are required" });
    return;
  }

  jwt.verify(token, env.jwtSecret, (err) => {
    if (err) {
      res.status(403).json({ message: "Session expired", error: "closeSession" });
      return;
    }
    next();
  });
};