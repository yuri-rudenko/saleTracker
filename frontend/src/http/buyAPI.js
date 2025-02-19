import { $authHost, $host } from "./indexAPI.js";

export const getOneBuy = async ({_id}) => {

    return await $host.get(`/api/Buy/${_id}`);

}

export const getAllBuys = async () => {

    return await $host.get(`/api/buy`);

}

export const getAllBuysOfProducts = async (values) => {

    return await $host.get(`/api/buy/products`, values);

}

export const createBuy = async (values) => {

    return await $host.post(`/api/buy`, values);

}

export const editBuy = async (values) => {

    return await $host.put(`/api/buy/edit`, values);

}

export const deleteBuy = async ({_id}) => {

    return await $host.delete(`/api/buy/${_id}`);

}