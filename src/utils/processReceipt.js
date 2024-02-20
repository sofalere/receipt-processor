import { nanoid } from 'nanoid'

const processReceipt = (receipt, points) => {
  receipt.points = points;
  receipt.id = nanoid();

  return receipt;
}

export default processReceipt;