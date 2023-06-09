import { Router } from 'express';
import CompanyController from '../controllers/companyController';
import Joi from 'joi';
import validate from './../middlewares/validation';
import { authenticateToken } from './../middlewares/authMiddleware';

const router = Router();

const registerSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    NIT: Joi.number().required()
});

router.post('/register', validate(registerSchema), authenticateToken, CompanyController.register);

export default router;