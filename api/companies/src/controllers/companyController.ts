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

      const newCompany = new Company({ name, NIT, address, phone, active: 1 });

      await newCompany.save();

      res.status(201).json({ message: 'Compañia creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async edit(req: Request, res: Response): Promise<void> {
    try {
      const { name, NIT, address, phone } = req.body;

      const existingCompany = await Company.findOne({ NIT });

      if (!existingCompany) {
        res.status(400).json({ message: 'La compañia no existe' });
        return;
      }

      existingCompany.name = name;
      existingCompany.address = address;
      existingCompany.phone = phone;

      await existingCompany.save();

      res.status(201).json({ message: 'Compañia editada exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { NIT } = req.body;

      const existingCompany = await Company.findOne({ NIT });

      if (!existingCompany) {
        res.status(400).json({ message: 'La compañia no existe' });
        return;
      }

      existingCompany.active = 0;

      await existingCompany.save();

      res.status(201).json({ message: 'Compañia eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async get(req: Request, res: Response): Promise<void> {
    try {
      const companies = await Company.find({ active: 1 });

      res.status(201).json({ data: companies });
    } catch (error) {
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }
}

export default new CompanyController();