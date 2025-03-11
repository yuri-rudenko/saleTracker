import { $authHost, $host } from "./indexAPI";
import { jwtDecode } from "jwt-decode";

export const registration = async (values) => {
    try {
        const { data } = await $host.post('/auth/register', values);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return (error.response);
    }

}

export const login = async (values) => {
    try {
        const { data } = await $host.post('/auth/login', values);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return (error.response);
    }
}

export const check = async () => {
    try {
        if (!localStorage.getItem('token')) return { message: "Not Authorised" };
        const { data } = await $authHost.get('/auth/auth');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        return (error.response);
    }

}