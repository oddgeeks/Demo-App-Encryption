# Demo App
## Objective
The Demo App is designed to receive encrypted JSON data via a webhook, decrypt it on the backend, and instantly display it on the frontend in real time. This project demonstrates the use of AES-256-GCM encryption, WebSocket-based real-time updates, and secure data handling practices.

## Table of Contents
- [Objective](#objective)
- [Technologies Used](#technologies-used)
- [Architecture Overview](#architecture-overview)
- [Data Handling and Encryption](#data-handling-and-encryption)
- [Setup Instructions](#setup-instructions)
- [Starting the Application](#starting-the-application)
- [Testing the Application](#testing-the-application)

## Technologies Used
- Frontend: React, Next.js
- Backend: Node.js, Express
- Encryption: AES-256-GCM
- Real-Time Communication: WebSocket
- Data Display: react-json-view

## Architecture Overview
I. Frontend: A React + Next.js app that connects to the backend via WebSocket. It listens for real-time data updates and displays decrypted JSON data in an easy-to-read format.

II. Backend: A Node.js server with Express that:
- Receives encrypted JSON data from a webhook.
- Decrypts the data using AES-256-GCM.
- Broadcasts the decrypted data to connected WebSocket clients.

## Data Handling and Encryption
- Encryption Algorithm: The app uses AES-256-GCM for secure data encryption.  This algorithm provides both data confidentiality and integrity via an authentication tag.
- IV (Initialization Vector): A unique IV is generated for each encryption operation to ensure different ciphertexts even for identical data.
- Auth Tag: The AES-GCM mode generates an authentication tag that verifies the integrity of the data, ensuring it hasn’t been tampered with.

## Setup Instructions
### Prerequisites
Node.js (v14+)
npm (Node Package Manager)
1. Clone the Repository

```bash
git clone https://github.com/your-username/demo-app.git
cd demo-app
```

2. Install Dependencies
Install dependencies for both the backend and frontend:

```bash
# For the backend
cd backend
npm install

# For the frontend
cd ../frontend
npm install
```

3. Environment Variables
Set up environment variables for both backend and frontend.

I. Backend (.env)
Create a .env file in the backend directory:

```bash
ENCRYPTION_KEY=<32-byte-hex-key>
ENCRYPTION_IV=<12-byte-hex-iv>
PORT=3001
```

- Replace <32-byte-hex-key> with a randomly generated 64-character hex string (e.g., 08f94c703f0dc7fb4aeca3496dce352a5a34269d16afacbbea3d9db17820095f).
- Replace <12-byte-hex-iv> with a randomly generated 24-character hex string (e.g., b19087b5846f1db61e3bf399).

II. Frontend (.env.local)
Create a .env.local file in the frontend directory:

```bash
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001
```

## Starting the Application
1. Start the Backend
In the backend directory:
```bash
npm run start
```
The backend server will start on http://localhost:3001.

2. Start the Frontend
In the frontend directory:
```bash
npm run dev
```
The frontend will be accessible at http://localhost:3000.

## Testing the Application
### Simulate Webhook Data
To test the app, you can simulate a webhook request by sending encrypted data to the backend.
1. Generate Encrypted Data: Visit http://localhost:3001/encrypt (a sample endpoint) to generate encrypted test data.
2. Send Webhook Request:
- Use a tool like Postman or curl to send a POST request to http://localhost:3001/webhook with the encryptedData from the previous step.
- Example curl command:
```bash
curl -X POST http://localhost:3001/webhook -H "Content-Type: application/json" -d '{"encryptedData":"<YOUR_ENCRYPTED_DATA>"}'
```

### Check Real-Time Display
1. Open http://localhost:3000 in your browser.
2. After sending the webhook data, the decrypted JSON should appear on the frontend in real time.

## Key Security Practices
1. Environment-Based Key Storage: Use environment variables for storing sensitive keys.
2. Encryption with AES-256-GCM: Ensures data confidentiality and integrity.
3. WebSocket Secure (wss) in Production: For production, secure the WebSocket connection with wss:// to prevent interception.
