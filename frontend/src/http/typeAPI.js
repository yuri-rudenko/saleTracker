import { $authHost } from "./indexAPI.js";

export const getOneType = async ({_id}) => {

    return await $authHost.get(`/type/${_id}`);

}

export const getAllTypes = async () => {

    return await $authHost.get(`/type`);

}

export const createType = async (values) => {

    return await $authHost.post(`/type`, values);

}

export const editType = async (values) => {

    return await $authHost.put(`/type`, values);

}

export const deleteType = async ({_id}) => {

    return await $authHost.delete(`/type/${_id}`);

}