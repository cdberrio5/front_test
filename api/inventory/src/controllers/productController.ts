import { Request, Response } from 'express';
import Product from './../models/product';

class ProductController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, quantity, price, companyId, photo } = req.body;

      const newProduct = new Product({ name, quantity, price, companyId, photo, active: 1 });

      await newProduct.save();

      res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async edit(req: Request, res: Response): Promise<void> {
    try {
      const { name, quantity, price, _id } = req.body;

      const existingProduct = await Product.findOne({ _id });

      if (!existingProduct) {
        res.status(400).json({ message: 'El producto no existe' });
        return;
      }

      existingProduct.name = name;
      existingProduct.quantity = quantity;
      existingProduct.price = price;

      await existingProduct.save();

      res.status(201).json({ message: 'Producto editado exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = req.body;

      const existingProduct = await Product.findOne({ _id });

      if (!existingProduct) {
        res.status(400).json({ message: 'El producto no existe' });
        return;
      }

      existingProduct.active = 0;

      await existingProduct.save();

      res.status(201).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async getByCompany(req: Request, res: Response): Promise<void> {
    try { 

      const { NIT } = req.body;

      const products = await Product.find({ active: 1, NIT });

      res.status(201).json({ data: products });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async get(req: Request, res: Response): Promise<void> {
    try { 
      const products = await Product.find({ active: 1 });

      res.status(201).json({ data: products });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }
}

export default new ProductController();