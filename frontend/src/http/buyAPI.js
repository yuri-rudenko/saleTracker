import cleanArray from "../functions/cleanArray.js";
import { $authHost, $host } from "./indexAPI.js";

export const getOneBuy = async ({_id}) => {

    return await $host.get(`/Buy/${_id}`);

}

export const getAllBuys = async () => {

    return await $host.get(`/buy`);

}

export const getAllBuysOfProducts = async (values) => {

    return await $host.get(`/buy/products`, values);

}

export const createBuy = async (values) => {

    if (!values?.products || values.products.length === 0) {
        return;
    }

    return await $host.post(`/buy`, {...values, products: cleanArray(values.products)});

}

export const editBuy = async (values) => {

    return await $host.put(`/buy/edit`, values);

}

export const deleteBuy = async ({_id}) => {

    return await $host.delete(`/buy/${_id}`);

}