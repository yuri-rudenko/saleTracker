import { $authHost, $host } from "./indexAPI.js";

export const getOneBrand = async ({_id}) => {

    return await $host.get(`/brand/${_id}`);

}

export const getAllBrands = async () => {

    return await $host.get(`/brand`);

}


export const createBrand = async (values) => {

    return await $host.post(`/brand`, values);

}

export const editBrand = async (values) => {

    return await $host.put(`/brand`, values);

}

export const deleteBrand = async ({_id}) => {

    return await $host.delete(`/brand/${_id}`);

}