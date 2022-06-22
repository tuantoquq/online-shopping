import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";

export const apiCustomerLogin = async (email, password) => {
    let url = BASE_API_URL + '/customer/login';
    let data = {
        email: email,
        password: password
    };
    let response;
    try{
        response = await axios.post(
            url,
            data, {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }catch(err){
        console.log(err);
    }
    return response;
}