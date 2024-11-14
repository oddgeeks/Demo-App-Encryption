import { Router, Request, Response } from 'express';
import { encryptData } from '../utils/encrypt';
import { DecryptedData } from '../types/types';

const router = Router();

router.get('/encrypt', (req: Request, res: Response) => {
  const sampleData: DecryptedData = {
    id: '12345',
    message: 'Hello, this is a test message!',
    timestamp: new Date().toISOString(),
  };

  const encryptedData = encryptData(sampleData);
  res.status(200).json({ encryptedData });
});

export default router;
