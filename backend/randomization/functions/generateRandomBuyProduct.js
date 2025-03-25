import generateRandomProduct from "./generateRandomProduct.js";
import getRandomId from "./getRandomId.js"
import randomFloatInRange from "./randomFloatInRange.js";
import randomInRange from "./randomInRange.js";
import ranges from "./ranges.js";

export default function () {

    const id = getRandomId();

    return {
        _id: id,
        product: generateRandomProduct(),
        amount: randomInRange(ranges.buyProductAmount.min, ranges.buyProductAmount.max),
        price: randomFloatInRange(ranges.buyProductPrice.min, ranges.buyProductPrice.max),
        amountInOne: randomInRange(ranges.buyProductAmountInOne.min, ranges.buyProductAmountInOne.max),
        sold: randomInRange(ranges.buyProductSold.min, ranges.buyProductSold.max)
    }
};