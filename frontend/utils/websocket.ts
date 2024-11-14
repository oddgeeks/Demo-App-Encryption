import { DecryptedData } from '../types/types';

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001';

export function connectWebSocket(onMessage: (data: DecryptedData) => void) {
  const socket = new WebSocket(websocketUrl);

  socket.onmessage = (event) => {
    const data: DecryptedData = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onopen = () => console.log('Connected to WebSocket');
  socket.onclose = () => console.log('Disconnected from WebSocket');
}

