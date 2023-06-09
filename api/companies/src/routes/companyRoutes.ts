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

const editSchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    phone: Joi.number(),
    NIT: Joi.number()
});

const deleteSchema = Joi.object({
    NIT: Joi.number().required()
});

router.post('/register', validate(registerSchema), authenticateToken, CompanyController.register);
router.post('/edit', validate(editSchema), authenticateToken, CompanyController.edit);
router.post('/delete', validate(deleteSchema), authenticateToken, CompanyController.delete);
router.get('/get', authenticateToken, CompanyController.get);

export default router;