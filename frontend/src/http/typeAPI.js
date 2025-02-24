import { $authHost, $host } from "./indexAPI.js";

export const getOneType = async ({_id}) => {

    return await $host.get(`/type/${_id}`);

}

export const getAllTypes = async () => {

    return await $host.get(`/type`);

}

export const createType = async (values) => {

    return await $host.post(`/type`, values);

}

export const editType = async (values) => {

    return await $host.put(`/type`, values);

}

export const deleteType = async ({_id}) => {

    return await $host.delete(`/type/${_id}`);

}