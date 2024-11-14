import { Router, Request, Response } from 'express';
import { decryptData } from '../utils/decrypt';
import { broadcastToClients } from '../services/websocketService';

const router = Router();

router.post('/webhook', (req: Request, res: Response) => {
  const encryptedString = req.body.encryptedData;

  try {
    const decryptedData = decryptData(encryptedString);

    broadcastToClients(JSON.stringify(decryptedData));
    res.status(200).json({ message: 'Data received and sent to clients.' });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).json({ message: 'Failed to decrypt data.' });
  }
});

export default router;
