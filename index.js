import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ritmoRoutes from './routes/ritmoroutes.js';


const app = express()

const port = 3000

const httpServer = createServer(app);

// Configurar Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
//midlewares
app.use(express.json())
app.use('/api/ritmo', ritmoRoutes(io));


app.get('/', function (req, res) {
    res.send('Hello World')
  })

 io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
  
    // Escuchar eventos desde el frontend
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
  
  // Iniciar el servidor
  httpServer.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
