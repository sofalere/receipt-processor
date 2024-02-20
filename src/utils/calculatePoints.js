import { 
  RETAILER_ALPHANUM_POINTS, 
  TOTAL_ROUND_POINTS,
  TOTAL_MULTIPLE_OF_QUARTER_POINTS,
  ITEMS_EVERY_TWO_POINTS,
  ITEMS_DESCRIPTION_MULTIPLIER,
  PURCHASE_DATE_ODD_POINTS,
  PURCHASE_TIME_WINDOW_POINTS
} from "../constants/pointsToAdd.js";

// helpers for point calculations
const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str);
}

const isRound = (amount) => {
  return amount % 1 === 0;
}

const isMultipleofQuarter = (amount) => {
  const multipliedAmount = amount * 100;
  return multipliedAmount % 25 === 0;
}

const isOddDay = (day) => {
  return day % 2 !== 0;
}

const isInTimeWindow = (time) => {
  let hour = parseInt(time.slice(0,2))
  const minutes = parseInt(time.slice(3,5))
  if (minutes === 0) {
    hour--;
  }
  return hour >= 14 && hour < 16;
}

// functions for calculating points in different properties
const fromRetailer = (retailer, pointsObj) => {
  for (let i = 0; i < retailer.length; i++) {
    if (isAlphanumeric(retailer[i])) {
      pointsObj.points = pointsObj.points + RETAILER_ALPHANUM_POINTS;
    }
  }
};

const fromTotal = (total, pointsObj) => {
  const amount = parseFloat(total);

  if (!Number.isFinite(amount) || isNaN(amount)) {
    return false;
  }

  if (isRound(amount)) {
    pointsObj.points = pointsObj.points + TOTAL_ROUND_POINTS;
  }
  
  if (isMultipleofQuarter(amount)) {
    pointsObj.points = pointsObj.points + TOTAL_MULTIPLE_OF_QUARTER_POINTS;
  }
}

const fromItems = (items, pointsObj) => {
  pointsObj.points = pointsObj.points + (Math.floor(items.length / 2) * ITEMS_EVERY_TWO_POINTS);

  items.forEach((item) => {
    const length = item.shortDescription.trim().length;
    if (length % 3 === 0) {
      pointsObj.points = pointsObj.points + Math.ceil(item.price * ITEMS_DESCRIPTION_MULTIPLIER);
    }
  });
}

const fromDate = (date, pointsObj) => {
  const day = parseInt(date.slice(-2))
  if (isOddDay(day)) {
    pointsObj.points = pointsObj.points + PURCHASE_DATE_ODD_POINTS;
  };
}

const fromTime = (time, pointsObj) => {
  if (isInTimeWindow(time)) {
    pointsObj.points = pointsObj.points + PURCHASE_TIME_WINDOW_POINTS;
  };
}

const calculatePoints = (receipt) => {
  let pointsObj = {points: 0};
  fromRetailer(receipt.retailer, pointsObj);
  fromTotal(receipt.total, pointsObj);
  fromItems(receipt.items, pointsObj);
  fromDate(receipt.purchaseDate, pointsObj);
  fromTime(receipt.purchaseTime, pointsObj);
  return pointsObj.points;
}

export default calculatePoints;