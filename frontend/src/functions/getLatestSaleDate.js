import getStandartDate from "./dates/getStandartDate";

export default function (productId, sales) {

    const salesWithProduct = sales?.filter(sale =>
        sale.products.find(saleProduct => saleProduct.product._id === productId)
    );

    if (!salesWithProduct || salesWithProduct.length === 0) return getStandartDate(new Date("01.01.1970"));

    const latestSale = salesWithProduct.reduce((latest, sale) =>
        new Date(sale.date) > new Date(latest.date) ? sale : latest
    );

    return getStandartDate(new Date(latestSale.date));
}