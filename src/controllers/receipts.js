import calculatePoints from "../utils/calculatePoints.js";
import processReceipt from "../utils/processReceipt.js";
import { getIdIfReceiptExists, saveReceipt } from "../services/inMemoryStorage.js";

const addReceipt = (req, res) => {
  try {
    const receipt = req.body;
    let id = getIdIfReceiptExists(receipt);

    if (!id) {
      const points = calculatePoints(receipt);
      const processedReceipt = processReceipt(receipt, points);
      saveReceipt(processedReceipt);

      id = processedReceipt.id
    }
    res.json({ id: id });
  } catch (error) {
    console.error('Error saving receipt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default addReceipt;