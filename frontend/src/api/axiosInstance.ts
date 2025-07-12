import axios from "axios";

export const apiOneInstance = axios.create({
    baseURL:`${import.meta.env.VITE_APP_CLIENT_1_URL}/client-a/`
})

export const apiTwoInstance = axios.create({
    baseURL:`${import.meta.env.VITE_APP_CLIENT_2_URL}/client-b/`
})

