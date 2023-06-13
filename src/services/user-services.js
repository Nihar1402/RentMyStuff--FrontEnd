import { myAxios } from "./helper";

export const loginUser=(LoginDetail)=>{
    return myAxios.post('/signin',LoginDetail).then((response)=>response.data);
}