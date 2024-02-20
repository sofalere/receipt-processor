import { getReceiptById } from "../services/inMemoryStorage.js";

const getPoints = (req, res) => {
  const id = req.params["id"];
  try {
    const id = req.params["id"];
    const receipt = getReceiptById(id);
    res.json({ points: receipt.points });
  } catch (error) {
    console.error('Error fetching points:', error);
    res.status(500).json({ message: 'Invalid request, please try again' });
  }
}

export default getPoints;