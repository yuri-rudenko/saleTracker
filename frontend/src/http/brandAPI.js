import { $authHost} from "./indexAPI.js";

export const getOneBrand = async ({_id}) => {

    return await $authHost.get(`/brand/${_id}`);

}

export const getAllBrands = async () => {

    return await $authHost.get(`/brand`);

}


export const createBrand = async (values) => {

    return await $authHost.post(`/brand`, values);

}

export const editBrand = async (values) => {

    return await $authHost.put(`/brand`, values);

}

export const deleteBrand = async ({_id}) => {

    return await $authHost.delete(`/brand/${_id}`);

}