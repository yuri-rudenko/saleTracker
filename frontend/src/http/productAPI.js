import { $authHost, $host } from "./indexAPI.js";

export const getOneProduct = async ({_id}) => {

    return await $host.get(`/api/product/${_id}`);

}

export const getAllProducts = async () => {

    return await $host.get(`/api/product`);

}

export const createProduct = async (values) => {

    return await $host.post(`/api/product`, values);

}

export const editProduct = async (_id, fieldsToUpdate) => {

    return await $host.put(`/api/product/edit`, {_id, fieldsToUpdate});

}

export const editViews = async (values) => {

    return await $host.put(`/api/product/editViews`, values);

}

export const deleteProduct = async ({_id}) => {

    return await $host.delete(`/api/product/${_id}`);

}