import express from 'express';
import receiptsApi from './routes/receiptsApi.js';

const app = express();

app.use("/receipts", receiptsApi)

export default app;