# Solana Token Dashboard Backend

This is an Express.js backend with MongoDB for the Solana Token Dashboard. It provides REST endpoints for holders and transactions.

## Endpoints
- `GET /holders` - Returns top 60 token holders
- `GET /transactions` - Returns latest transactions

## Setup
1. Install dependencies: `npm install`
2. Set your MongoDB URI in a `.env` file as `MONGODB_URI`
3. Start the server: `npm run dev`
