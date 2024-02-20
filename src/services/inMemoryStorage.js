const receiptsStorage = [];

const receiptAlreadySaved = (newReceipt) => {
  return receiptsStorage.some((receipt) => {
    receipt = receipt[Object.keys(receipt)[0]]
    return (receipt.purchaseDate === newReceipt.purchaseDate &&
            receipt.purchaseTime === newReceipt.purchaseTime &&
            receipt.total === newReceipt.total);
  })
}

const saveReceipt = (receipt) => {
  receiptsStorage.push({ [receipt.id]: receipt});
}

export {
  receiptAlreadySaved,
  saveReceipt
}