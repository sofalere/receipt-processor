import express from 'express';
import addReceipt from "../controllers/receipts.js"
const router = express.Router();

router.post('/process', addReceipt);
router.get('/:id/points', (req, res) => {
  res.send('Hello World!');
});

export default router;