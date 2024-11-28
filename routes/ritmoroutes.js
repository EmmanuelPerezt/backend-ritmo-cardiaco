import { Router } from 'express';

export default function ritmoRoutes(io) {
  const router = Router();

  // Ruta para recibir datos del ESP32
  router.post('/', (req, res) => {
    const datos = req.body;
    console.log('Datos recibidos:', datos);

    // Emitir los datos a todos los clientes conectados
    io.emit('nuevos-datos', datos);

    res.status(200).send('Datos recibidos correctamente');
  });

  return router;
}