export default function (productId, sales) {
    return sales
        ?.map(sale => {
            const filteredProducts = sale.products.filter(
                saleProduct => saleProduct.product._id === productId
            );

            if (filteredProducts.length > 0) {
                return {
                    ...sale,
                    products: filteredProducts
                };
            }
            return null;
        })
        .filter(sale => sale !== null);
}