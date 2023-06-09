import { Request, Response } from 'express';
import Company from './../models/company';

class CompanyController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, NIT, address, phone } = req.body;

      const existingCompany = await Company.findOne({ NIT });

      if (existingCompany) {
        res.status(400).json({ message: 'La compañia ya existe' });
        return;
      }

      const newCompany = new Company({ name, NIT, address, phone });

      await newCompany.save();

      res.status(201).json({ message: 'Compañia creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }
}

export default new CompanyController();