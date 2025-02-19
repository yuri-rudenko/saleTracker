import { $authHost, $host } from "./indexAPI.js";

export const getOneBrand = async ({_id}) => {

    return await $host.get(`/api/brand/${_id}`);

}

export const getAllBrands = async () => {

    return await $host.get(`/api/brand`);

}


export const createBrand = async (values) => {

    return await $host.post(`/api/brand`, values);

}

export const editBrand = async (values) => {

    return await $host.put(`/api/brand`, values);

}

export const deleteBrand = async ({_id}) => {

    return await $host.delete(`/api/brand/${_id}`);

}