import generateRandomSaleProduct from "./generateRandomSaleProduct.js";
import getRandomDate from "./getRandomDate.js";
import getRandomId from "./getRandomId.js";
import randomFloatInRange from "./randomFloatInRange.js";
import randomInRange from "./randomInRange.js";
import ranges from "./ranges.js";

export default function() {

    const id = getRandomId();

    const type = ['OLX Nova', 'OLX Ukr', 'Nova', 'Ukr', 'Meeting', 'Other', 'Unknown'][randomInRange(0, 6)];

    const numberOfProducts = randomInRange(1, 5);
    const products = Array.from({ length: numberOfProducts }).map(() => generateRandomSaleProduct());

    return {
        _id: id,
        type,
        status: "Approved",
        date: new Date(getRandomDate()),
        price: randomFloatInRange(ranges.buyPrice.min, ranges.buyPrice.max),
        products: products,
        amount: products.length
    };
};