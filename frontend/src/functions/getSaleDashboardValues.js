export default function getSaleDashboardValues(sales) {
    let revenue = 0;
    let orderAmount = 0;

    for (let sale of sales) {
        for (let saleProduct of sale.products) {
            revenue += (saleProduct.price - saleProduct.averageBuyPrice) * saleProduct.amount;
        }

        const givenDate = new Date(sale.date);
        const today = new Date();
        const diffInDays = (today - givenDate) / (1000 * 60 * 60 * 24);

        if (diffInDays <= 30) orderAmount++;
    }

    return { revenue, daysPerOrder: orderAmount ? 30 / orderAmount : 0 };
}