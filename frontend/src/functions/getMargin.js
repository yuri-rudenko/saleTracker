export default function (products) {
    return products.reduce((acc, product) => acc + (product.price - product.averageBuyPrice) * product.amount, 0).toFixed(2)
}