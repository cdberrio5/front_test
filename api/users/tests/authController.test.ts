import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Usuario creado exitosamente' });
  });

  it('should fail to register an existing user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'El usuario ya existe' });
  });

  it('should log in a user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail to log in with wrong credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Credenciales inválidas' });
  });
});