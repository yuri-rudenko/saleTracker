import { $authHost, $host } from "./indexAPI.js";

export const getOneType = async ({_id}) => {

    return await $host.get(`/api/type/${_id}`);

}

export const getAllTypes = async () => {

    return await $host.get(`/api/type`);

}

export const createType = async (values) => {

    return await $host.post(`/api/type`, values);

}

export const editType = async (values) => {

    return await $host.put(`/api/type`, values);

}

export const deleteType = async ({_id}) => {

    return await $host.delete(`/api/type/${_id}`);

}