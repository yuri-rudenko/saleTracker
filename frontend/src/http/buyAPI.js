import cleanArray from "../functions/cleanArray.js";
import { $authHost } from "./indexAPI.js";

export const getOneBuy = async ({ _id }) => {

    return await $authHost.get(`/Buy/${_id}`);

}

export const getAllBuys = async () => {

    return await $authHost.get(`/buy`);

}

export const getAllBuysOfProducts = async (values) => {

    return await $authHost.get(`/buy/products`, values);

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

    return await $authHost.post(`/buy`, { ...newValues, products: cleanArray(newValues.products) });
};

export const editBuy = async (values) => {

    return await $authHost.put(`/buy/edit`, values);

}

export const deleteBuy = async ({ _id }) => {

    return await $authHost.delete(`/buy/${_id}`);

}