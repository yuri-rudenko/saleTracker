import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import getLatestSaleDate from '../../functions/getLatestSaleDate';
import './productStyel.css';
import RevenueGraph from '../../Components/RevenueGraph';
import getSalesWithProduct from '../../functions/getSalesWithProduct';

function createData(image, name, category, brand, left, buyprice, sellprice, sales, saleDate, buyDate, views, increase, _id) {
    return {
        image,
        name,
        category,
        brand,
        left,
        buyprice,
        sellprice,
        sales,
        saleDate,
        buyDate,
        views,
        increase,
        _id
    };
}

const Product = () => {

    const navigate = useNavigate();

    const { productId } = useParams();
    const product = useSelector((state) =>
        state.products.list.find(item => item._id === productId)
    );
    const sales = useSelector((state) =>
        state.sales.list
    );
    const buys = useSelector((state) =>
        state.buys.list
    );

    const filteredSales = getSalesWithProduct(productId, sales);

    if (!product?._id) return;

    const productData = createData(product.image, product.name, product.type.name, product.brand.name, product.currentlyAvaliable, Number(product.averageBuyPrice).toFixed(1), Number(product.averageSellPrice).toFixed(1), product.amountSold, getLatestSaleDate(product._id, sales), getLatestSaleDate(product._id, buys), product.views.at(-1).views, product.increase || 0, product._id);

    return (
        <>
            <div className='product-page'>
                <div className="buttons">
                    <Button className='return' onClick={() => navigate('/items')} variant='outlined'>{"<--"}</Button>
                    <Button variant="outlined">Edit Product</Button>
                </div>
                <div className="product-top">
                    <div className="left">

                        <div className="name">{productData.name}</div>
                        <img src={product.image}></img>
                        <div className="left-data">
                            <div className="key">Category - </div>
                            <div className="value">{productData.category}</div>
                        </div>
                        <div className="left-data">
                            <div className="key">Brand - </div>
                            <div className="value">{productData.brand}</div>
                        </div>

                    </div>
                    <div className="right">
                        <div className="right-data">
                            <div className="key">Amount left:</div>
                            <div className="value">{productData.left}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Average buy price:</div>
                            <div className="value">{productData.buyprice}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Average sell price:</div>
                            <div className="value">{productData.sellprice}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Sales amount:</div>
                            <div className="value">{productData.sales}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Average margin:</div>
                            <div className="value">{(productData.sellprice - productData.buyprice).toFixed(2)}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Total margin:</div>
                            <div className="value">{productData.sales * productData.sellprice}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Views:</div>
                            <div className="value">{productData.views}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Latest sale:</div>
                            <div className="value">{productData.saleDate}</div>
                        </div>
                        <div className="right-data">
                            <div className="key">Latest buy:</div>
                            <div className="value">{productData.buyDate}</div>
                        </div>
                    </div>
                </div>
                <div className="graphs">
                    <RevenueGraph givenSales={filteredSales}/>
                </div>
            </div>
        </>
    );
}

export default Product;
