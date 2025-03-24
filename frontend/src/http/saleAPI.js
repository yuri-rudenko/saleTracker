import cleanArray from "../functions/cleanArray.js";
import { $authHost } from "./indexAPI.js";

export const getOneSale = async ({ _id }) => {

    return await $authHost.get(`/sale/${_id}`);

}

export const getAllSales = async () => {

    return await $authHost.get(`/sale`);

}

export const getAllSalesOfProducts = async (values) => {

    return await $authHost.get(`/sale/products`, values);

}

export const createSale = async (values) => {

    return await $authHost.post(`/sale`, { ...values, products: cleanArray(values?.products || []) });

}

export const editSale = async (values) => {

    return await $authHost.put(`/sale`, values);

}

export const approveSale = async (saleId) => {

    return await $authHost.put(`/sale/approveSale/${saleId}`);

}

export const deleteSale = async (_id) => {

    return await $authHost.delete(`/sale/${_id}`);

};