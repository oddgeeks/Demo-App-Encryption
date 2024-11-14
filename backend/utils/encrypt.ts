import crypto from 'crypto';
import { DecryptedData } from '../types/types';
import { ENCRYPTION_KEY } from '../config/env';

const key = Buffer.from(ENCRYPTION_KEY, 'hex'); // 32 bytes for AES-256

export function encryptData(data: DecryptedData): string {
  // Generate a new 12-byte IV for each encryption
  const iv = crypto.randomBytes(12);
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  // Encrypt the data
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // Get the authentication tag
  const authTag = cipher.getAuthTag();

  // Combine IV, auth tag, and encrypted data into a single Buffer
  const combinedBuffer = Buffer.concat([iv, authTag, Buffer.from(encrypted, 'base64')]);

  // Encode as Base64 for storage
  return combinedBuffer.toString('base64');
}
