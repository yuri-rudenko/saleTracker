import cleanArray from "../functions/cleanArray.js";
import { $authHost, $host } from "./indexAPI.js";

export const getOneBuy = async ({ _id }) => {

    return await $host.get(`/Buy/${_id}`);

}

export const getAllBuys = async () => {

    return await $host.get(`/buy`);

}

export const getAllBuysOfProducts = async (values) => {

    return await $host.get(`/buy/products`, values);

}

export const createBuy = async (values, course) => {
    if (!values?.products || values.products.length === 0) {
        return;
    }

    if (!course) {
        throw new Error("Course not found.");
    }

    const newValues = {
        ...values,
        products: values.products.map(product => ({
            ...product,
            price: values.usd ? Number(product.price) * course : Number(product.price)
        }))
    };

    return await $host.post(`/buy`, { ...newValues, products: cleanArray(newValues.products) });
};

export const editBuy = async (values) => {

    return await $host.put(`/buy/edit`, values);

}

export const deleteBuy = async ({ _id }) => {

    return await $host.delete(`/buy/${_id}`);

}