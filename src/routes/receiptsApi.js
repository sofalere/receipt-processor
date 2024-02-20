import express from 'express';
import addReceipt from "../controllers/receipts.js"
import getPoints from "../controllers/points.js"
const router = express.Router();

router.post('/process', addReceipt);
router.get('/:id/points', getPoints);

export default router;