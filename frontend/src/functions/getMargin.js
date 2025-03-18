export default function (products) {

    console.log(products);
    return products.reduce((acc, product) => acc + (product.averageBuyPrice === 0 ? 0 : product.price - product.averageBuyPrice) * product.amount, 0).toFixed(2)
}