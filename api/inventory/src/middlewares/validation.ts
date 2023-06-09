import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

const validate = (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    res.status(400).json({ message: errorMessage });
  } else {
    next();
  }
};

export default validate;