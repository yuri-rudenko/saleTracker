import cleanArray from "../functions/cleanArray.js";
import { $authHost, $host } from "./indexAPI.js";

export const getOneSale = async ({_id}) => {

    return await $host.get(`/sale/${_id}`);

}

export const getAllSales = async () => {

    return await $host.get(`/sale`);

}

export const getAllSalesOfProducts = async (values) => {

    return await $host.get(`/sale/products`, values);

}

export const createSale = async (values) => {

    return await $host.post(`/sale`, {...values, products: cleanArray(values.products)});

}

export const editSale = async (values) => {

    return await $host.put(`/sale/edit`, values);

}

export const deleteSale = async ({_id}) => {

    return await $host.delete(`/sale/${_id}`);

}