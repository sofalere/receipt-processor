const receiptsStorage = [];

const getIdIfReceiptExists = (newReceipt) => {
  let id = false;
  console.log(receiptsStorage);

  receiptsStorage.some((receipt) => {
    if (receipt.purchaseDate === newReceipt.purchaseDate &&
        receipt.purchaseTime === newReceipt.purchaseTime &&
        receipt.total === newReceipt.total) {
          id = receipt.id;
          return true;
    }
  })

  return id;
}

const saveReceipt = (receipt) => {
  receiptsStorage.push(receipt);
}

const getReceiptById = (id) => {
  const receipt = receiptsStorage.find((receipt) => receipt.id === id);
  if (!receipt) {
    throw new Error(`Receipt with ID ${id} not found`);
  }
  return receipt;
}

export {
  getIdIfReceiptExists,
  saveReceipt,
  getReceiptById
}