import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';
