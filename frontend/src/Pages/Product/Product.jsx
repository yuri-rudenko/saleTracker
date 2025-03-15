import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const Product = () => {

    const {productId} = useParams();
    const product = useSelector((state) =>
        state.products.list.find(item => item._id === productId)
    );

    return (
        <div>
           {product?.name}
        </div>
    );
}

export default Product;
