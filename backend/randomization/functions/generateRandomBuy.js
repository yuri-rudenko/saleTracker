import generateRandomBuyProduct from "./generateRandomBuyProduct.js";
import getRandomDate from "./getRandomDate.js";
import getRandomId from "./getRandomId.js";
import randomFloatInRange from "./randomFloatInRange.js";
import randomInRange from "./randomInRange.js";
import ranges from "./ranges.js";

export default function() {

    const id = getRandomId();

    const numberOfProducts = randomInRange(1, 5);
    const products = Array.from({ length: numberOfProducts }).map(() => generateRandomBuyProduct());

    return {
        _id: id,
        date: new Date(getRandomDate(   )),
        price: randomFloatInRange(ranges.buyPrice.min, ranges.buyPrice.max),
        status: ranges.buyStatusOptions[randomInRange(0, ranges.buyStatusOptions.length - 1)],
        products: products
    };
};