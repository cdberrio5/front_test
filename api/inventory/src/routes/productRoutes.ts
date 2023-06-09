import express from 'express';
import ProductController from '../controllers/productController';
import { authenticateToken } from './../middlewares/authMiddleware';
import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            const extension = file.mimetype.split("/").pop();
            const name = Date.now() + "." + req.body.companyId + "." + extension;

            req.body.photo = "/uploads/" + name;  

            cb( null, name);
        }
    }
);

const upload = multer({ storage });

const router = express.Router();

router.post('/register', authenticateToken, upload.single('image'), ProductController.register);
router.post('/edit', authenticateToken, upload.single('image'), ProductController.edit);
router.post('/delete', authenticateToken, ProductController.delete);
router.post('/get', authenticateToken, ProductController.get);
router.post('/getByCompany', authenticateToken, ProductController.getByCompany);

export default router;