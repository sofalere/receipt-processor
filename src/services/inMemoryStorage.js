const receiptsStorage = [];

const getIdIfReceiptExists = (newReceipt) => {
  let id = false;

  receiptsStorage.some((receipt) => {
    receipt = receipt[Object.keys(receipt)[0]]
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
  receiptsStorage.push({ [receipt.id]: receipt});
}

export {
  getIdIfReceiptExists,
  saveReceipt
}