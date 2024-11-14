import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import wss from './services/websocketService';
import encryptRoute from './routes/encryptRoute';
import webhookRoute from './routes/webhookRoute';
import { PORT } from './config/env';

dotenv.config();

const app = express();
app.use(express.json());

// Register routes
app.use(encryptRoute);
app.use(webhookRoute);

// Create and start the HTTP server
const server = http.createServer(app);

// Upgrade the server for WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Start listening on the defined port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
