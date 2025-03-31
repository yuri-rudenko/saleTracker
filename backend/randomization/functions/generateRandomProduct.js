import brands from "../randomText/brands.js";
import names from "../randomText/names.js";
import types from "../randomText/types.js";
import generateViewsArray from "./generateViewsArray.js";
import getRandomId from "./getRandomId.js";
import randomFloatInRange from "./randomFloatInRange.js";
import randomInRange from "./randomInRange.js";
import ranges from "./ranges.js";

export default function () {

    const randomImage = Math.floor(Math.random() * 40) + 1;
    const id = getRandomId();

    return {
        _id: id,
        name: names[Math.floor(Math.random() * names.length)],
        image: `${process.env.SERVER_URL}/images/${randomImage}.webp`,
        link: `https://example.com/product/${id}`,
        type: {name: types[Math.floor(Math.random() * types.length)]},
        brand: {name: brands[Math.floor(Math.random() * brands.length)]},
        isOnSale: true,
        averageBuyPrice: randomFloatInRange(ranges.productAverageBuyPrice.min, ranges.productAverageBuyPrice.max),
        averageBuyPriceLeft: randomFloatInRange(ranges.productAverageBuyPrice.min, ranges.productAverageBuyPrice.max),
        averageSellPrice: randomFloatInRange(ranges.productAverageSellPrice.min, ranges.productAverageSellPrice.max),
        currentlyAvaliable: randomInRange(ranges.productCurrentlyAvailable.min, ranges.productCurrentlyAvailable.max),
        amountSold: randomInRange(ranges.productAmountSold.min, ranges.productAmountSold.max),
        views: generateViewsArray(368, 5, 2000)
    }
};