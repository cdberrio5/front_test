import app from './app';
import env from './dotenv';

const port = env.port;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});