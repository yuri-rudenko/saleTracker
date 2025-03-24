import { $authHost } from "./indexAPI.js";

export const getOneProduct = async ({_id}) => {

    return await $authHost.get(`/product/${_id}`);

}

export const getAllProducts = async () => {

    return await $authHost.get(`/product`);

}

export const createProduct = async (values) => {

    return await $authHost.post(`/product`, values);

}

export const editProduct = async (_id, fieldsToUpdate) => {

    return await $authHost.put(`/product/edit`, {_id, fieldsToUpdate});

}

export const editViews = async (values) => {

    return await $authHost.put(`/product/editViews`, values);

}

export const deleteProduct = async ({_id}) => {

    return await $authHost.delete(`/product/${_id}`);

}