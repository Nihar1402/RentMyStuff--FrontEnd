import axios from 'axios'
export const BASE_URL='https://rentmy.up.railway.app'
export const myAxios=axios.create({
    baseURL:BASE_URL,
});