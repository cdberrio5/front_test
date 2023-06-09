import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './../models/user';
import env from './../dotenv';

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: 'El usuario ya existe' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ email, password: hashedPassword, name, rol: 'Externo' });
      await newUser.save();

      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error, message: 'Error interno del servidor' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const token = jwt.sign({ email: user.email }, env.jwtSecret, {
        expiresIn: '1h',
      });

      res.json({ token, rol: user.rol });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new AuthController();