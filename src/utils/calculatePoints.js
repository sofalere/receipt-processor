import { 
  RETAILER_ALPHANUM_POINTS, 
  TOTAL_ROUND_POINTS,
  TOTAL_MULTIPLE_OF_QUARTER_POINTS,
  ITEMS_EVERY_TWO_POINTS,
  ITEMS_DESCRIPTION_MULTIPLIER,
  PURCHASE_DATE_ODD_POINTS,
  PURCHASE_TIME_WINDOW_POINTS
} from "../constants/pointsToAdd.js";

class PointCalculator {
  constructor() {
    this.points = 0;
  }

  isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  isRound(amount) {
    return amount % 1 === 0;
  }

  isMultipleofQuarter(amount) {
    const multipliedAmount = amount * 100;
    return multipliedAmount % 25 === 0;
  }

  isOddDay(day) {
    return day % 2 !== 0;
  }

  isInTimeWindow(time) {
    let hour = parseInt(time.slice(0,2))
    const minutes = parseInt(time.slice(3,5))
    if (minutes === 0) {
      hour--;
    }
    return hour >= 14 && hour < 16;
  }

  fromRetailer(retailer) {
    for (let i = 0; i < retailer.length; i++) {
      if (this.isAlphanumeric(retailer[i])) {
        this.points += RETAILER_ALPHANUM_POINTS;
      }
    }
  }

  fromTotal(total) {
    const amount = parseFloat(total);

    if (!Number.isFinite(amount) || isNaN(amount)) {
      return false;
    }

    if (this.isRound(amount)) {
      this.points += TOTAL_ROUND_POINTS;
    }
    
    if (this.isMultipleofQuarter(amount)) {
      this.points += TOTAL_MULTIPLE_OF_QUARTER_POINTS;
    }
  }

  fromItems(items) {
    this.points += (Math.floor(items.length / 2) * ITEMS_EVERY_TWO_POINTS);

    items.forEach((item) => {
      const length = item.shortDescription.trim().length;
      if (length % 3 === 0) {
        this.points += Math.ceil(item.price * ITEMS_DESCRIPTION_MULTIPLIER);
      }
    });
  }

  fromDate(date) {
    const day = parseInt(date.slice(-2))
    if (this.isOddDay(day)) {
      this.points += PURCHASE_DATE_ODD_POINTS;
    };
  }

  fromTime(time) {
    if (this.isInTimeWindow(time)) {
      this.points += PURCHASE_TIME_WINDOW_POINTS;
    };
  }

  calculatePoints(receipt) {
    this.fromRetailer(receipt.retailer);
    this.fromTotal(receipt.total);
    this.fromItems(receipt.items);
    this.fromDate(receipt.purchaseDate);
    this.fromTime(receipt.purchaseTime);
    return this.points;
  }
}

export default PointCalculator;
