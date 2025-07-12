import axios from "axios";

export const apiOneInstance = axios.create({
    baseURL:`${import.meta.env.VITE_APP_URL}+/client-a/`
})

export const apiTwoInstance = axios.create({
    baseURL:`${import.meta.env.VITE_APP_URL}+/client-b/`
})

