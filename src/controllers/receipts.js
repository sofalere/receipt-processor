import calculatePoints from "../utils/calculatePoints.js";
import processReceipt from "../utils/processReceipt.js";
import { receiptAlreadySaved, saveReceipt } from "../services/inMemoryStorage.js";

const addReceipt = (req, res) => {
  const receipt = req.body;
  if (receiptAlreadySaved(receipt)) {
    res.status(400).send('Receipt already exists');
    return;
  }
  const points = calculatePoints(receipt);
  const processedReceipt = processReceipt(receipt, points);
  saveReceipt(processedReceipt);

  res.send('receipt recevied, heres the id');
};

export default addReceipt;