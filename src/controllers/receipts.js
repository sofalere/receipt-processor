import calculatePoints from "../utils/calculatePoints.js";
import processReceipt from "../utils/processReceipt.js";
import { receiptAlreadySaved, saveReceipt } from "../services/inMemoryStorage.js";

const addReceipt = (req, res) => {
  const receipt = req.body;
  if (receiptAlreadySaved(receipt)) {
    return res.status(400).json({ message: 'Receipt already exists' });
  }
  const points = calculatePoints(receipt);
  const processedReceipt = processReceipt(receipt, points);
  saveReceipt(processedReceipt);

  res.json({id: processedReceipt.id});
};

export default addReceipt;