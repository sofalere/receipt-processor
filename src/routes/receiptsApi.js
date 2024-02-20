import express from 'express';
import processReceipt from "../controllers/receipts.js"
const router = express.Router();

router.post('/process', processReceipt);
router.get('/:id/points', (req, res) => {
  res.send('Hello World!');
});

export default router;