import { $authHost, $host } from "./indexAPI.js";

export const getOneSale = async ({_id}) => {

    return await $host.get(`/api/sale/${_id}`);

}

export const getAllSales = async () => {

    return await $host.get(`/api/sale`);

}

export const getAllSalesOfProducts = async (values) => {

    return await $host.get(`/api/sale/products`, values);

}

export const createSale = async (values) => {

    return await $host.post(`/api/sale`, values);

}

export const editSale = async (values) => {

    return await $host.put(`/api/sale/edit`, values);

}

export const deleteSale = async ({_id}) => {

    return await $host.delete(`/api/sale/${_id}`);

}