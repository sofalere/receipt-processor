import calculatePoints from "../utils/calculatePoints.js";

const processReceipt = (req, res) => {
  console.log(req.body);
  const receipt = req.body;
  calculatePoints(receipt);
  res.send('receipt recevied, heres the id');
};

export default processReceipt;