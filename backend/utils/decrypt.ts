import crypto from 'crypto';
import { DecryptedData } from '../types/types';
import { ENCRYPTION_KEY } from '../config/env';

const key = Buffer.from(ENCRYPTION_KEY, 'hex');

export function decryptData(encryptedString: string): DecryptedData {
  // Decode the Base64-encoded string to get the combined buffer
  const encryptedBuffer = Buffer.from(encryptedString, 'base64');

  // Extract the IV, auth tag, and encrypted data
  const iv = encryptedBuffer.slice(0, 12);           // First 12 bytes are the IV
  const authTag = encryptedBuffer.slice(12, 28);     // Next 16 bytes are the auth tag
  const ciphertext = encryptedBuffer.slice(28);      // Remaining bytes are the encrypted data

  // Create decipher with the extracted IV
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  // Decrypt the data
  let decrypted = decipher.update(ciphertext, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  console.log(decrypted)

  return JSON.parse(decrypted) as DecryptedData;
}
